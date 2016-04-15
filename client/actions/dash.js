import * as actionTypes from '../actionTypes/dash.js';
import { get, post, del } from '../utils/api';
import merge from 'lodash.merge';

var Api = require('../utils/api');

export function startExam (data) {
  return async dispatch => {
    try {
      const result = await post('/api/startExam', data);
      
      // set LocalStorage for UI display in case of refresh
      localStorage.setItem('endTime', result.endTime);

      dispatch({
        type: actionTypes.START_EXAM_SUCCESS,
        result: result
      });

    } catch(e) {
      dispatch({
        type: actionTypes.START_EXAM_ERROR,
        ERROR: e
      });
    }
  };
}

export function queryExam (data) {
  var newTimeRemaining;

  return async dispatch => {
    try {
      const queryExamResult = await post('/api/queryExam', data);

      // IF the exam has already begun (page refresh, navigated away, etc.) //
      if(localStorage.getItem('endTime')) {
        console.log('there is an unfinished exam currrently in progresssso');

        // Re-calculate Time Remaining
        const now = new Date();
        const endTime = new Date(queryExamResult.endTime);
        const nowTime = new Date(now);
        newTimeRemaining = Math.abs(endTime - nowTime);
      }

      dispatch({
        type: actionTypes.QUERY_EXAM_SUCCESS,
        queryExamResult: queryExamResult,
        newTimeRemaining: newTimeRemaining
      });

    } catch(e) {
      dispatch({
        type: actionTypes.QUERY_EXAM_ERROR,
        ERROR: e
      });
    }
  };
}

export function queryAllPrompts () {
  var midExamObject = {};
  var passResult = {};
  var index2Swap;

  var swapArrayElements = function(arr, indexA, indexB) {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
  };

  return async dispatch => {
    try {
      const queryPromptResult = await get('/api/queryAllPrompts');

      // Exam Has Already Begun
      if(localStorage.getItem('currentPromptId')) {
        console.log('gaspacho dispacho');

        // Re-fetch all prompts
        try {
          const queryPromptResult = await get('/api/queryAllPrompts');

          // filter for ones already answered
          var newAllPrompts = queryPromptResult.filter(function(val) {
            return localStorage.getItem('answeredPrompts').indexOf(val._id) === -1;
          });


          // Prepare Prompts Array - discard used prompt
          newAllPrompts.shift();

          // Put currentPrompt as first item in array
          for(var index in newAllPrompts){
            if(newAllPrompts[index]._id === localStorage.getItem('currentPromptId') ){
              index2Swap = index;
            }
          }
          swapArrayElements(newAllPrompts, index2Swap, 0);

          // pass Object
          console.log('@#$@#$@#$@$@#$@#$---->>>>>>',newAllPrompts);
          passResult = newAllPrompts;
          
        } catch(e) {
          dispatch({
            type: actionTypes.QUERY_ALL_PROMPTS_ERROR,
            ERROR: e
          });
        }

      } else { 
        // Brand New Exam Start
        localStorage.setItem('currentPromptId', queryPromptResult[0]._id);
        passResult = queryPromptResult;
      }
      
      dispatch({
        type: actionTypes.QUERY_ALL_PROMPTS_SUCCESS,
        queryPromptResult: passResult
      });

    } catch(e) {
      dispatch({
        type: actionTypes.QUERY_ALL_PROMPTS_ERROR,
        ERROR: e
      });
    }
  };
}

export function submitAnswer (data) {
  // Prepare Prompts Array - discard used prompt
  const newAllPrompts = data.allPrompts;
  newAllPrompts.shift();

  // set LocalStorage for consistency in case of refresh
  localStorage.setItem('currentPromptId', newAllPrompts[0]._id);

  // Calculate Time Remaining
  const now = new Date();
  const endTime = new Date(data.endTime);
  const nowTime = new Date(now);
  const newTimeRemaining = Math.abs(endTime - nowTime);

  return async dispatch => {
    try {
      const submitResult = await post('/api/submitAnswer', data);

      // set answeredPrompts locally
      console.log('answered prompts array dude ->', submitResult.answeredPrompts);
      localStorage.setItem('answeredPrompts', submitResult.answeredPrompts);

      dispatch({
        type: actionTypes.SUBMIT_ANSWER_SUCCESS,
        submitResult: submitResult,
        newAllPrompts: newAllPrompts,
        newTimeRemaining: newTimeRemaining
      });

      // IF questionsTotal has been reached,
      // FINISH EXAM
      if (data.questionsAsked === data.questionsTotal) {
        const result = await post('/api/finishExam', data);

        try {
          const result = await post('/api/finishExam', data);
          
          // remove localStorage variables for UI display
          localStorage.removeItem('endTime');
          localStorage.removeItem('currentPromptId');
          localStorage.removeItem('answeredPrompts');
          
          dispatch({
            type: actionTypes.FINISH_EXAM_SUCCESS,
            result: result
          });

        } catch(e) {
          dispatch({
            type: actionTypes.FINISH_EXAM_ERROR,
            ERROR: e
          });
        }
      }

    } catch(e) {
      dispatch({
        type: actionTypes.SUBMIT_ANSWER_ERROR,
        ERROR: e
      });
    }
  };
}
export function finishExam (data) {
  return async dispatch => {
    const result = await post('/api/finishExam', data);


    try {
      const result = await post('/api/finishExam', data);

      // Remove localStorage variables used for exam interruptions
      localStorage.removeItem('endTime');
      localStorage.removeItem('currentPromptId');
      localStorage.removeItem('answeredPrompts');

      dispatch({
        type: actionTypes.FINISH_EXAM_SUCCESS,
        result: result
      });

    } catch(e) {
      dispatch({
        type: actionTypes.FINISH_EXAM_ERROR,
        ERROR: e
      });
    }
  };
}