import * as actionTypes from '../actionTypes/sessions';
import merge from 'lodash.merge';

const initialState = {
  sessions: {
    loggedInUserId: null,
    loggedInUserEmail: ''
  }
};

const loginUser = (state, action) => {
  return merge({}, state, {
    sessions: {
      loggedInUserId: action.loginResult.userId,
      loggedInUserEmail: action.loginResult.userEmail
    }
  });
};

const logoutUser = (state, action) => {
  return merge({}, state, {
    sessions: {
      loggedInUserId: null,
      loggedInUserEmail: ''
    }
  });
};

const authenticateUser = (state, action) => {
  return merge({}, state, {
    sessions: {
      loggedInUserId: null,
      loggedInUserEmail: action.authenticateResult.email
    }
  });
};


export default function sessions (state = initialState, action) {
  return ({
    [actionTypes.LOGIN_USER_SUCCESS]: loginUser,
    [actionTypes.LOGOUT_USER_SUCCESS]: logoutUser,
    [actionTypes.AUTHENTICATE_USER_SUCCESS]: authenticateUser
  }[action.type] || ((s) => s))(state, action);
}
