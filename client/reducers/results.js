import * as actionTypes from '../actionTypes/results.js';
import merge from 'lodash.merge';

const initialState = {
  currentResult: {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    allAnswers: []
  }
};

const queryCandidateAnswers = (state, action) => {
  return merge({}, state, {
    currentResult: action.queryResult
  });
};

export default function results (state = initialState, action) {
  return ({
    [actionTypes.QUERY_CANDIDATE_ANSWERS_SUCCESS]: queryCandidateAnswers
  }[action.type] || ((s) => s))(state, action);
}
