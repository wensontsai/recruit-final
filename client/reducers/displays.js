import * as actionTypes from '../actionTypes/displays';
// import merge from 'lodash.merge';

const initialState = {
  displaysObject: {
      'Europe': {
        status : 'OFF'
      },
      'NYC': {
        status : 'OFF'
      },
      'South America': {
        status : 'OFF'
      },
      'Asia': {
        status: 'OFF'
      }, 
      'Airport': {
        status : 'OFF'
      },
      'Mars': {
        status : 'OFF'
      }
  },
  currentDisplay: {
    name: '***',
    status: '***'
  }
};

// when app initializes
// query for All Displays available
// and set initialState
const queryAllDisplays = () => {
  return initialState;
}

const selectDisplay = (state, action) => {
  let newState = Object.assign({}, state);

  newState.currentDisplay = {
    name: action.currentDisplay,
    status: newState.displaysObject[action.currentDisplay].status
  }
  return newState;
}

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

export default function displays(state = initialState, action) {
  return ({
    [actionTypes.SELECT_DISPLAY]: selectDisplay,
    [actionTypes.SEND_COMMAND_SUCCESS]: sendCommand
  }[action.type] || (s => s))(state, action);
}
