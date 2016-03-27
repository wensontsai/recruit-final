import * as actionTypes from '../actionTypes/dash';
import merge from 'lodash.merge';

const initialState = {
  data: {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    examId: '',
    questionsAsked: 0,
    questionsTotal: 0,
    timeAllowed: 0,
    endTime: '',
    currentPrompt: '',
    currentPromptId: false,
    allPrompts: []
  },
  view: {
    showPrompt: null,
    examCompleted: false
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

const queryExam = (state, action) => {
  return merge({}, state, {
    data: {
      userId: action.queryExamResult.userId,
      firstName: action.queryExamResult.firstName,
      lastName: action.queryExamResult.lastName,
      examId: action.queryExamResult.examId,
      email: action.queryExamResult.email,
      endTime: action.queryExamResult.endTime
    }
  });
};

const queryAllPrompts = (state, action) => {
  return merge({}, state, {
    data: {
      currentPrompt: action.queryPromptResult[0].question,
      currentPromptId: action.queryPromptResult[0]._id,
      allPrompts: action.queryPromptResult
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

const selectNextPrompt = (state, action) => {
  let questionsAsked = state.data.questionsAsked;
  let newQuestionsAsked = state.data.questionsAsked + 1;

  let allPrompts = state.data.allPrompts;
  let newAllPrompts = allPrompts.shift();
  return merge({}, state, {
    data: {
      questionsAsked: newQuestionsAsked,
      currentPrompt: allPrompts[0].question,
      currentPromptId: allPrompts[0]._id,
      allPrompts: newAllPrompts
    }
  });
};


export default function dash (state = initialState, action) {
  return ({
    [actionTypes.START_EXAM_SUCCESS]: startExam,
    [actionTypes.QUERY_EXAM_SUCCESS]: queryExam,
    [actionTypes.QUERY_ALL_PROMPTS_SUCCESS]: queryAllPrompts,
    [actionTypes.SUBMIT_ANSWER_SUCCESS]: submitAnswer,
    [actionTypes.FINISH_EXAM_SUCCESS]: finishExam,

    [actionTypes.SELECT_NEXT_PROMPT]: selectNextPrompt

  }[action.type] || ((s) => s))(state, action);
}
