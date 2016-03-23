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
  let newState = Object.assign({}, state);
  console.log("WTFFFFFF");
  console.log(action.result.prompt);

  newState.data = {
    currentPrompt: action.result.prompt
  };

  newState.view = {
    showPrompt: true
  };
  return newState;
};

const sendCommand = (state, action) => {
  let newState = Object.assign({}, state);

  newState.displaysObject[action.result.display] = {
    status: action.result.command
  }
  newState.currentDisplay = {
    name: action.result.display,
    status: action.result.command
  }
  return newState;
}

const submitAnswer = (state, action) => {
  let newState = Object.assign({}, state);
  console.log('submit successful');
};

export default function dash (state = initialState, action) {
  return ({
    [actionTypes.START_EXAM_SUCCESS]: startExam,
    [actionTypes.SUBMIT_ANSWER_SUCCESS]: submitAnswer
  }[action.type] || ((s) => s))(state, action);
}
