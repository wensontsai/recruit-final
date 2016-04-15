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

      if(localStorage.getItem('endTime')){
        console.log('there is an unfinished exam currrently in progresssso');

        // Calculate Time Remaining
        const now = new Date();
        const endTime = new Date(queryExamResult.endTime);
        const nowTime = new Date(now);
        newTimeRemaining = Math.abs(endTime - nowTime);
        console.log(newTimeRemaining);
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
  return async dispatch => {
    try {
      const queryPromptResult = await get('/api/queryAllPrompts');

      dispatch({
        type: actionTypes.QUERY_ALL_PROMPTS_SUCCESS,
        queryPromptResult: queryPromptResult
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

  // Calculate Time Remaining
  const now = new Date();
  const endTime = new Date(data.endTime);
  const nowTime = new Date(now);
  const newTimeRemaining = Math.abs(endTime - nowTime);

  return async dispatch => {
    try {
      const submitResult = await post('/api/submitAnswer', data);
      dispatch({
        type: actionTypes.SUBMIT_ANSWER_SUCCESS,
        submitResult: submitResult,
        newAllPrompts: newAllPrompts,
        newTimeRemaining: newTimeRemaining
      });

      if (data.questionsAsked === data.questionsTotal) {
        const result = await post('/api/finishExam', data);

        try {
          const result = await post('/api/finishExam', data);
          
          // remove localStorage variables for UI display
          localStorage.removeItem('endTime');
          
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

      // remove localStorage variables for UI display
      localStorage.removeItem('endTime');

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