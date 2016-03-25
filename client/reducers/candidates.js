import * as actionTypes from '../actionTypes/candidates';
import merge from 'lodash.merge';

const initialState = {
  
};


const queryAllCandidates = (state, action) => {
  return merge({}, state, {
    data: {
      currentPrompt: action.result[0].question
    }
  });
};

const addCandidate = (state, action) => {
  console.log("check");
  return merge({}, state, {
    data: {
      questionNum: 1
    }
  });
};


export default function candidates (state = initialState, action) {
  return ({
    [actionTypes.QUERY_ALL_CANDIDATES_SUCCESS]: queryAllCandidates,
    [actionTypes.ADD_CANDIDATE_SUCCESS]: addCandidate
  }[action.type] || ((s) => s))(state, action);
}
