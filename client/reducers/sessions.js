import * as actionTypes from '../actionTypes/sessions';
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
      candidatesAll: action.queryResult,
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


export default function sessions (state = initialState, action) {
  return ({

  }[action.type] || ((s) => s))(state, action);
}
