import * as actionTypes from '../actionTypes/candidates.js';
import { get, post, del } from '../utils/api';

var Api = require('../utils/api');

export function queryAllCandidates () {
  return async dispatch => {
    try {
      const result = await get('/api/queryAllCandidates');
      dispatch({
        type: actionTypes.QUERY_ALL_CANDIDATES_SUCCESS,
        result: result
      });

    } catch(e) {
      dispatch({
        type: actionTypes.QUERY_ALL_CANDIDATES_ERROR,
      });
    }
  };
}

export function addCandidate (data) {
  return async dispatch => {
    try {
      const result = await post('/api/addCandidate', data);
      dispatch({
        type: actionTypes.ADD_CANDIDATE_SUCCESS,
        result: result
      });

    } catch(e) {
      dispatch({
        type: actionTypes.ADD_CANDIDATE_ERROR,
      });
    }
  };
}