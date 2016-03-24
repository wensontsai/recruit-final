import * as actionTypes from '../actionTypes/dash';
import merge from 'lodash.merge';

const initialState = {
  data: {
    userId: '',
    emailCode: 'xxxxx',
    questionNum: null,
    timeAllowed: 0
  },
  view: {
    timeRemaining: {},
    showPrompt: null,
  }
};

const startExam = (state, action) => {
  return merge({}, state, {
    data: {
      currentPrompt: action.result.prompt,
      // query this from examinations table
      timeAllowed: 7200000
    },
    view: {
      showPrompt: true
    }
  });
};

const submitAnswer = (state, action) => {


};


export default function dash (state = initialState, action) {
  return ({
    [actionTypes.START_EXAM_SUCCESS]: startExam,
    [actionTypes.SUBMIT_ANSWER_SUCCESS]: submitAnswer
  }[action.type] || ((s) => s))(state, action);
}
