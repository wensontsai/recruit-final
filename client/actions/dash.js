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
  return async dispatch => {
    try {
      const submitResult = await post('/api/submitAnswer', data);
      dispatch({
        type: actionTypes.SUBMIT_ANSWER_SUCCESS,
        submitResult: submitResult
      });

      if (data.questionsAsked >= data.questionsTotal ) {
        console.log('wtfdudeee');
        finishExam();
      } else {
        queryAllPrompts();
      }

    } catch(e) {
      dispatch({
        type: actionTypes.SUBMIT_ANSWER_ERROR,
        ERROR: e
      });
    }
  };
}

export function finishExam () {
  return async dispatch => {
    try {
      const result = await post('/api/finishExam');

      dispatch({
        type: actionTypes.FINISH_EXAM_SUCCESS,
      });

    } catch(e) {
      dispatch({
        type: actionTypes.FINISH_EXAM_ERROR,
        ERROR: e
      });
    }
  };
}