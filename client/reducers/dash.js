import * as actionTypes from '../actionTypes/dash';
import merge from 'lodash.merge';

const initialState = {
  data: {
    userId: 'test001',
    emailCode: 'xxxxx',
    questionsAsked: 0,
    questionsTotal: 0,
    timeAllowed: 0, 
    currentPrompt: '',
    currentPromptId: false,
  },
  view: {
    showPrompt: null,
    examCompleted: ''
  }
};

const startExam = (state, action) => {
  return merge({}, state, {
    data: {
      questionsAsked: 1,
      questionsTotal: 3,
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
      currentPrompt: action.queryPromptResult[0].question,
      currentPromptId: action.queryPromptResult[0]._id
    }
  });
};

const submitAnswer = (state, action) => {
  return merge({}, state, {
    data: {
      questionsAsked: action.submitResult.questionsAsked
    }
  });
};

const finishExam = (state, action) => {
  return merge({}, state, {
    view: {
      examCompleted: true
    }
  });
};


export default function dash (state = initialState, action) {
  return ({
    [actionTypes.START_EXAM_SUCCESS]: startExam,
    [actionTypes.QUERY_ALL_PROMPTS_SUCCESS]: queryAllPrompts,
    [actionTypes.SUBMIT_ANSWER_SUCCESS]: submitAnswer,
    [actionTypes.FINISH_EXAM_SUCCESS]: finishExam,
  }[action.type] || ((s) => s))(state, action);
}
