import * as actionTypesNotifications from '../actionTypes/notifications.js';
import * as actionTypes from '../actionTypes/dash.js';
import { get, post, del } from '../utils/api';
import merge from 'lodash.merge';

var Api = require('../utils/api');

export function startExam (data) {
  var questionsAsked;

  // clear localStorage variables used for exam interruptions
  localStorage.removeItem('endTime');
  localStorage.removeItem('currentPromptId');
  localStorage.removeItem('answeredPrompts');

  return async dispatch => {
    try {
      const result = await post('/api/startExam', data);
      
      // set LocalStorage for UI display in case of refresh
      localStorage.setItem('endTime', result.endTime);

      // determine questionsAsked count
      result.answeredPrompts ? questionsAsked = result.answeredPrompts.length + 1 : questionsAsked = 1;

      dispatch({
        type: actionTypes.START_EXAM_SUCCESS,
        result: result,
        questionsAsked: questionsAsked
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
  var questionsAsked;
  var notifications;

  return async dispatch => {
    try {
       const queryExamResult = await get('/api/queryExam/' +data.examId);

      // IF the exam has already begun (page refresh, navigated away, etc.) //
      if(localStorage.getItem('endTime')) {
        console.log('there is an unfinished exam currrently in progresssso');
        // Re-calculate Time Remaining
        const now = new Date();
        const endTime = new Date(queryExamResult.endTime);
        const nowTime = new Date(now);
        newTimeRemaining = Math.abs(endTime - nowTime);
      }

      //determine questionsAsked count
      queryExamResult.answeredPrompts ? questionsAsked = queryExamResult.answeredPrompts.length + 1 : questionsAsked = 1;

      dispatch({
        type: actionTypes.QUERY_EXAM_SUCCESS,
        queryExamResult: queryExamResult,
        newTimeRemaining: newTimeRemaining,
        questionsAsked: questionsAsked
      });

    } catch(e) {
      const notifications = e.error;
      dispatch({
        type: actionTypes.QUERY_EXAM_ERROR,
        ERROR: e
      }),
      dispatch({
        type: actionTypesNotifications.ADD_NOTIFICATIONS,
        notifications: notifications
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
    return arr;
  };

  return async dispatch => {
    try {
      const queryPromptResult = await get('/api/queryAllPrompts');

      // Exam Has Already Begun
      if(localStorage.getItem('currentPromptId')) {
        // Re-fetch all prompts
        try {
          const queryPromptResult = await get('/api/queryAllPrompts');

          // filter for ones already answered
          var newAllPrompts = queryPromptResult.filter(function(val) {
            return localStorage.getItem('answeredPrompts').indexOf(val._id) === -1;
          });

          // Put currentPrompt as first item in array
          for(var index in newAllPrompts) {
            if(newAllPrompts[index]._id === localStorage.getItem('currentPromptId') ){
              index2Swap = index;
            }
          }
          passResult = swapArrayElements(newAllPrompts, index2Swap, 0);
          
        } catch(e) {
          dispatch({
            type: actionTypes.QUERY_ALL_PROMPTS_ERROR,
            ERROR: e
          });
        }

      } else { 
        // Brand New Exam Start
        localStorage.setItem('currentPromptId', queryPromptResult[0]._id);
        localStorage.setItem('answeredPrompts', []);
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
  var questionsAsked;

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
      localStorage.setItem('answeredPrompts', submitResult.answeredPrompts);

      // determine questionsAsked count
      submitResult.answeredPrompts ? questionsAsked = submitResult.answeredPrompts.length + 1 : questionsAsked = 1;

      dispatch({
        type: actionTypes.SUBMIT_ANSWER_SUCCESS,
        submitResult: submitResult,
        newAllPrompts: newAllPrompts,
        newTimeRemaining: newTimeRemaining,
        questionsAsked: questionsAsked
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