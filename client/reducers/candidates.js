import * as actionTypes from '../actionTypes/candidates';
import merge from 'lodash.merge';

const initialState = {
  data: {
    userId: 'test001',
    emailCode: 'xxxxx',
    questionsAsked: 0,
    questionCount: 0,
    timeAllowed: 0, 
    currentPrompt: '',
  },
  view: {
    showPrompt: null,
  }
};

const startExam = (state, action) => {
  return merge({}, state, {
    data: {
      questionsAsked: 1,
      questionCount: 1,
      timeAllowed: 7200000
    },
    view: {
      showPrompt: true
    }
  });
};

const queryAllPrompts = (state, action) => {
  return merge({}, state, {
    data: {
      currentPrompt: action.result[0].question
    }
  });
};

const submitAnswer = (state, action) => {
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
