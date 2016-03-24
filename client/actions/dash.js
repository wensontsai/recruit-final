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
        userId: params.userId,
        emailCode: params.emailCode
      };
      const result = await post('/api/startExam', data);

      dispatch({
        type: actionTypes.START_EXAM_SUCCESS,
        result: data
      });
    } catch(e) {
      dispatch({
        type: actionTypes.START_EXAM_ERROR
      });
    }
  };
}

export function setTimer(time) {
  return async dispatch => {
    dispatch({
      type: actionTypes.SET_TIMER,
      timeRemaining: time
    });
  }
}

export function submitAnswer (params) {
  return async dispatch => {
    dispatch({
      type: actionTypes.SUBMIT_ANSWER
    });

    try {
      const data = {
        userId: params.userId,
        questionId: params.questionId,
        answer: params.answer,
        submitTime: params.submitTime
      };
      const result = await post('/api/submitAnswer', data);

      dispatch({
        type: actionTypes.SUBMIT_ANSWER_SUCCESS,
        result: data
      });
    } catch(e) {
      dispatch({
        type: actionTypes.SUBMIT_ANSWER_ERROR
      });
    }
  };
}