import * as actionTypes from '../actionTypes/sessions.js';
import { get, post, del } from '../utils/api';

var Api = require('../utils/api');


export function login (data) {
  return async dispatch => {
    try {
      const addResult = await post('/api/loginUser', data);
      dispatch({
        type: actionTypes.ADD_CANDIDATE_SUCCESS
      });

      const queryResult = await get('/api/queryAllCandidates');
      dispatch({
        type: actionTypes.QUERY_ALL_CANDIDATES_SUCCESS,
        queryResult: queryResult
      });

    } catch(e) {
      dispatch({
        type: actionTypes.ADD_CANDIDATE_ERROR,
        ERROR: e
      }),
      dispatch({
        type: actionTypes.QUERY_ALL_CANDIDATES_ERROR,
        ERROR: e
      });
    }
  };
}

export function sendEmail (userId) {
  return async dispatch => {
    try {
      const data = {
        data: {
          userId: userId
        }
      }
      const addResult = await post('/api/initializeExam', data);
      dispatch({
        type: actionTypes.SEND_EMAIL_SUCCESS
      });

      const queryResult = await get('/api/queryAllCandidates');
      dispatch({
        type: actionTypes.QUERY_ALL_CANDIDATES_SUCCESS,
        queryResult: queryResult
      });

    } catch(e) {
      dispatch({
        type: actionTypes.SEND_EMAIL_ERROR,
        ERROR: e
      }),
      dispatch({
        type: actionTypes.QUERY_ALL_CANDIDATES_ERROR,
        ERROR: e
      });
    }
  };
}