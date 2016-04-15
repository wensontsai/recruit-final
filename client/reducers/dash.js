import * as actionTypes from '../actionTypes/dash';
import merge from 'lodash.merge';

const initialState = {
  data: {
    // User data
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    
    // Prompt selection UI
    currentPrompt: '',
    currentPromptId: false,
    allPrompts: [],
    questionsAsked: 0,
    questionsTotal: 0,
    
    timeRemaining: 0,
    
    // Prompt data
    examId: '',
    timeAllowed: '',
    startTime: null,
    endTime: '',
    answeredPrompts: [],
    completed: null,
  },
  view: {
    showPrompt: null,
    examCompleted: false
  }
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

const queryExam = (state, action) => {
  return merge({}, state, {
    data: {
      userId: action.queryExamResult.userId,
      firstName: action.queryExamResult.firstName,
      lastName: action.queryExamResult.lastName,
      email: action.queryExamResult.email,
      examId: action.queryExamResult.examId,

      timeRemaining: action.newTimeRemaining,

      timeAllowed: action.queryExamResult.timeAllowed,
      questionsTotal: action.queryExamResult.questionsTotal,
      questionsAsked: action.queryExamResult.answeredPrompts.length + 1,
      startTime: action.queryExamResult.startTime,
      endTime: action.queryExamResult.endTime,
      answeredPrompts: action.queryExamResult.answeredPrompts,
      completed: action.queryExamResult.completed
    }
  });
};
const startExam = (state, action) => {
  return merge({}, state, {
    data: {
      questionsAsked: action.result.answeredPrompts.length + 1,
      timeRemaining: 7200000,

      questionsTotal: action.result.questionsTotal,
      timeAllowed: action.result.timeAllowed,
      startTime: action.result.startTime,
      endTime: action.result.endTime,
      answeredPrompts: action.result.answeredPrompts,
      completed: action.result.completed
    },
    view: {
      showPrompt: true
    }
  });
};
const submitAnswer = (state, action) => {
  return merge({}, state, {
    data: {
      questionsAsked: action.submitResult.answeredPrompts.length + 1,

      currentPrompt: action.newAllPrompts[0].question,
      currentPromptId: action.newAllPrompts[0]._id,
      allPrompts: action.newAllPrompts,

      timeRemaining: action.newTimeRemaining,

      answeredPrompts: action.submitResult.answeredPrompts,
      completed: action.submitResult.completed
    }
  });
};

const finishExam = (state, action) => {
  return merge({}, state, {
    data: {
      completed: action.result.completed
    },
    view: {
      examCompleted: true
    }
  });
};

export default function dash (state = initialState, action) {
  return ({
    [actionTypes.START_EXAM_SUCCESS]: startExam,
    [actionTypes.QUERY_EXAM_SUCCESS]: queryExam,
    [actionTypes.QUERY_ALL_PROMPTS_SUCCESS]: queryAllPrompts,
    [actionTypes.SUBMIT_ANSWER_SUCCESS]: submitAnswer,
    [actionTypes.FINISH_EXAM_SUCCESS]: finishExam

  }[action.type] || ((s) => s))(state, action);
}
