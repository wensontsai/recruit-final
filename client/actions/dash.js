import * as actionTypes from '../actionTypes/dash.js';
import { get, post, del } from '../utils/api';

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
        type: actionTypes.START_EXAM_ERROR
      });
    }
  };
}

export function queryAllPrompts () {
  return async dispatch => {
    try {
      const result = await get('/api/queryAllPrompts');

      dispatch({
        type: actionTypes.QUERY_ALL_PROMPTS_SUCCESS,
        result: result
      });

    } catch(e) {
      dispatch({
        type: actionTypes.QUERY_ALL_PROMPTS_ERROR
      });
    }
  };
}

export function submitAnswer (data) {
  return async dispatch => {
    try {
      const result = await post('/api/submitAnswer', data);
      dispatch({
        type: actionTypes.SUBMIT_ANSWER_SUCCESS,
        result: result
      });

    } catch(e) {
      dispatch({
        type: actionTypes.SUBMIT_ANSWER_ERROR
      });
    }
  };
}