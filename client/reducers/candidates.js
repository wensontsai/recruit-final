import * as actionTypes from '../actionTypes/candidates';
import merge from 'lodash.merge';

const initialState = {
  candidates: {
    candidatesAll: [],
    actionStatus: ''
  }
};

const queryAllCandidates = (state, action) => {
  return merge({}, state, {
    candidates: {
      candidatesAll: action.result,
      actionStatus: 'queryAllCandidates successful!'
    }
  });
};


const addCandidate = (state, action) => {
  return merge({}, state, {
    candidates: {
      candidatesAll: action.queryResult,
      actionStatus: 'Adding Candidate Successful!'
    }
  });
};


export default function candidates (state = initialState, action) {
  return ({
    [actionTypes.QUERY_ALL_CANDIDATES_SUCCESS]: queryAllCandidates,
    [actionTypes.ADD_CANDIDATE_SUCCESS]: addCandidate
  }[action.type] || ((s) => s))(state, action);
}
