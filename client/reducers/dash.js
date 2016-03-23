import * as actionTypes from '../actionTypes/dash';

const initialState = {
  data: {
    emailCode: '',
    userId: '',
  },
  view: {
    showPrompt: null
  }
};

// when app initializes
// grab email code for user from URI
// and set initialState
const startExam = (state, action) => {
  console.log(state);
  let newState = Object.assign({}, state);

  newState.view = {
    showPrompt: true
  };
  return newState;
};

const submitAnswer = (state, action) => {
  let newState = Object.assign({}, state);
  console.log('submit successful');
};

export default function dash (state = initialState, action) {
  return ({
    [actionTypes.START_EXAMINATION_SUCCESS]: startExam,
    [actionTypes.SUBMIT_ANSWER_SUCCESS]: submitAnswer
  }[action.type] || ((s) => s))(state, action);
}
