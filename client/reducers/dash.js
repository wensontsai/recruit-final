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
    timeRemaining: 0,
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
      endTime: action.result.endTime
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
      email: action.queryExamResult.email
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
      questionsAsked: action.newQuestionsAsked,
      timeRemaining: action.submitResult.timeRemaining,
      currentPrompt: action.newAllPrompts[0].question,
      currentPromptId: action.newAllPrompts[0]._id,
      allPrompts: action.newAllPrompts
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

// const selectNextPrompt = (state, action) => {
//   return merge({}, state, {
//     data: {
//       currentPrompt: action.newAllPrompts[0].question,
//       currentPromptId: action.newAllPrompts[0]._id,
//       allPrompts: action.newAllPrompts
//     }
//   });
// };

const setTimeRemaining = (state, action) => {
  let now = new Date();
  let endTime = new Date(state.data.endTime);
  let nowTime = new Date(now);
  let timeRemaining = Math.abs(endTime - nowTime);
  return merge({}, state, {
    data: {
      timeRemaining: timeRemaining
    }
  });
}


export default function dash (state = initialState, action) {
  return ({
    [actionTypes.START_EXAM_SUCCESS]: startExam,
    [actionTypes.QUERY_EXAM_SUCCESS]: queryExam,
    [actionTypes.QUERY_ALL_PROMPTS_SUCCESS]: queryAllPrompts,
    [actionTypes.SUBMIT_ANSWER_SUCCESS]: submitAnswer,
    [actionTypes.FINISH_EXAM_SUCCESS]: finishExam,

    // [actionTypes.SELECT_NEXT_PROMPT]: selectNextPrompt,
    [actionTypes.SET_TIME_REMAINING]: setTimeRemaining

  }[action.type] || ((s) => s))(state, action);
}
