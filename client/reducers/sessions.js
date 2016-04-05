import * as actionTypes from '../actionTypes/sessions';
import merge from 'lodash.merge';

const initialState = {
  sessions: {
    loggedInUserId: null
  }
};

const login = (state, action) => {
  return merge({}, state, {


  });
};

const logout = (state, action) => {
  return merge({}, state, {

  });
};


export default function sessions (state = initialState, action) {
  return ({
    [actionTypes.LOGIN_SUCCESS]: login,
    [actionTypes.LOGOUT_SUCCESS]: logout
  }[action.type] || ((s) => s))(state, action);
}
