import * as actionTypes from '../actionTypes/dash';
import merge from 'lodash.merge';

const initialState = {
  data: {
    emailCode: '',
    userId: '',
    questionNum: null,
    endTime: "March 31 2016 23:59:59 GMT+02:00"
  },
  view: {
    timeRemaining: {},
    showPrompt: null,
  }
};

// // ------------------clock--------------------------- //

// var t, clock, timeinterval;

// const getTimeRemaining = (endtime) => {
//   var t = Date.parse(endtime) - Date.parse(new Date());

//   console.log(new Date());
//   var seconds = Math.floor( (t/1000) % 60 );
//   var minutes = Math.floor( (t/1000/60) % 60 );
//   var hours = Math.floor( (t/(1000*60*60)) % 24 );
//   var days = Math.floor( t/(1000*60*60*24) );
//   return {
//     'total': t,
//     'days': days,
//     'hours': hours,
//     'minutes': minutes,
//     'seconds': seconds
//   };
// };

// const updateClock = () => {
//   var t = getTimeRemaining(initialState.data.endTime);

//   if(t.total<=0){
//     clearInterval(timeinterval);
//   }
// };

// // ------------------clock------------------------------- //

const startExam = (state, action) => {
  // // COUNTDOWN TIMER //
  // updateClock();
  // var timeinterval = setInterval(updateClock,1000);
  // //                //


  return merge({}, state, {
    data: {
      currentPrompt: action.result.prompt,
      // get the end time from server/DB, set here as the following:
      // endTime: action.result.endTime
      endTime: 'March 31 2015 23:59:59 GMT+02:00'
    },
    view: {
      showPrompt: true
    }
  });
};

const setTimer = (state, action) => {
  return merge({}, state, {
      view: {
        timeRemaining: action.timeRemaining
      }
    });
}

const submitAnswer = (state, action) => {


};


export default function dash (state = initialState, action) {
  return ({
    [actionTypes.START_EXAM_SUCCESS]: startExam,
    [actionTypes.SET_TIMER]: setTimer,
    [actionTypes.SUBMIT_ANSWER_SUCCESS]: submitAnswer
  }[action.type] || ((s) => s))(state, action);
}
