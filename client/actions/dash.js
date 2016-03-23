import * as actionTypes from '../actionTypes/dash.js';
import { get, post, del } from '../utils/api';

var Api = require('../utils/api');

export function startExam (params) {
  return async dispatch => {
    dispatch({
      type: actionTypes.START_EXAM
    });

    try {
      const data = {
        user_id: params.user_id
      };
      const result = await get('/api/startExam');

      dispatch({
        type: actionTypes.START_EXAM_SUCCESS
      });
    } catch(e) {
      dispatch({
        type: actionTypes.START_EXAM_ERROR
      });
    }
  };
}

export function submitAnswer (params) {
  return async dispatch => {
    dispatch({
      type: actionTypes.SUBMIT_ANSWER
    });

    try {
      const data = {
        user_id: params.user_id,
        question_id: params.question_id,
        answer: params.answer,
        submit_time: params.submit_time
      };
      const result = await get('/api/submitAnswer');

      dispatch({
        type: actionTypes.SUBMIT_ANSWER_SUCCESS,
        params: params
      });
    } catch(e) {
      dispatch({
        type: actionTypes.SUBMIT_ANSWER_ERROR
      });
    }
  };
}