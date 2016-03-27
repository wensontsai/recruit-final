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
      timeRemaining: 7200000
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
      questionsAsked: action.submitResult.questionsAsked,
      timeRemaining: action.submitResult.timeRemaining
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

const setTimeRemaining = (state, action) => {
  function parseTime(s) {
     var c = s.split(':');
     return parseInt(c[0]) * 60 + parseInt(c[1]);
  }

  let endTime = state.data.endTime.split(' ')[4];
  let now = new Date();
  let nowHours = now.getHours();
  let nowMinutes = now.getMinutes();
  let nowSeconds = now.getSeconds();
  let nowTime = nowHours+ ":" +nowMinutes+ ":" +nowSeconds;
  let timeRemaining = Math.abs(parseTime(endTime) - parseTime(nowTime) ) * 10000;
  console.log(state.data.endTime);
  console.log(endTime);
  console.log(nowTime);
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

    [actionTypes.SELECT_NEXT_PROMPT]: selectNextPrompt,
    [actionTypes.SET_TIME_REMAINING]: setTimeRemaining

  }[action.type] || ((s) => s))(state, action);
}
