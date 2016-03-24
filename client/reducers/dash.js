import * as actionTypes from '../actionTypes/dash';
import merge from 'lodash.merge';

const initialState = {
  data: {
    userId: 'test001',
    emailCode: 'xxxxx',
    questionNum: null,
    timeAllowed: 0, 
    currentPrompt: ''
  },
  view: {
    showPrompt: null,
  }
};

const startExam = (state, action) => {
  return merge({}, state, {
    data: {
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


};


export default function dash (state = initialState, action) {
  return ({
    [actionTypes.START_EXAM_SUCCESS]: startExam,
    [actionTypes.QUERY_ALL_PROMPTS_SUCCESS]: queryAllPrompts,
    [actionTypes.SUBMIT_ANSWER_SUCCESS]: submitAnswer
  }[action.type] || ((s) => s))(state, action);
}
