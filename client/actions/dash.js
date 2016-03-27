import * as actionTypes from '../actionTypes/dash.js';
import { get, post, del } from '../utils/api';
import merge from 'lodash.merge';

var Api = require('../utils/api');

export function startExam (data) {
  return async dispatch => {
    try {
      const result = await post('/api/startExam', data);

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

export function queryExam () {
  return async dispatch => {
    try {
      const queryExamResult = await post('/api/queryExam');

      dispatch({
        type: actionTypes.QUERY_EXAM_SUCCESS,
        queryExamResult: queryExamResult
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
  console.log(data);
  return async dispatch => {
    try {
      const submitResult = await post('/api/submitAnswer', data);
      dispatch({
        type: actionTypes.SUBMIT_ANSWER_SUCCESS,
        submitResult: submitResult
      });

      if (data.questionsAsked === 3 ) {
        console.log('test over');
        dispatch({
          type: actionTypes.FINISH_EXAM_SUCCESS,
        });
      } else {
        dispatch({
          type: actionTypes.SELECT_NEXT_PROMPT,
        });
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
    try {
      const result = await post('/api/finishExam', data);

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