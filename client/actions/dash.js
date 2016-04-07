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
      }),
      dispatch({
        type: actionTypes.SET_TIME_REMAINING,
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
  return async dispatch => {
    try {
      const queryExamResult = await post('/api/queryExam', data);

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
  const newQuestionsAsked = data.questionsAsked +1;

  const newAllPrompts = data.allPrompts;
  newAllPrompts.shift();

  return async dispatch => {
    try {
      const submitResult = await post('/api/submitAnswer', data);
      dispatch({
        type: actionTypes.SUBMIT_ANSWER_SUCCESS,
        submitResult: submitResult,
        newQuestionsAsked: newQuestionsAsked,
        newAllPrompts: newAllPrompts
      });

      if (data.questionsAsked === data.questionsTotal) {

        const result = await post('/api/finishExam', data);

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

      }
      // dispatch({
      //   type: actionTypes.SELECT_NEXT_PROMPT,
      //   newAllPrompts: newAllPrompts
      // }),
      dispatch({
        type: actionTypes.SET_TIME_REMAINING,
      });

    } catch(e) {
      dispatch({
        type: actionTypes.SUBMIT_ANSWER_ERROR,
        ERROR: e
      });
    }
  };
}