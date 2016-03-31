import * as actionTypes from '../actionTypes/results.js';
import { get, post, del } from '../utils/api';

var Api = require('../utils/api');

export function queryCandidateAnswers (data) {
  console.log(data);
  return async dispatch => {
    try {
      const queryResult = await post('/api/queryCandidateAnswers', data);
      dispatch({
        type: actionTypes.QUERY_CANDIDATE_ANSWERS_SUCCESS,
        queryResult: queryResult 
      });
      console.log(queryResult);

    } catch(e) {
      dispatch({
        type: actionTypes.QUERY_CANDIDATE_ANSWERS_ERROR,
        ERROR: e
      });
    }
  };
}