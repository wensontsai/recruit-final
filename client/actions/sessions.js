import * as actionTypes from '../actionTypes/sessions.js';
import { get, post, del } from '../utils/api';

var Api = require('../utils/api');


export function loginUser (data) {
  return async dispatch => {
    try {
      const loginResult = await post('/api/loginUser', data);
      dispatch({
        type: actionTypes.LOGIN_USER_SUCCESS,
        loginResult: loginResult
      });
    } catch(e) {
      dispatch({
        type: actionTypes.LOGIN_USER_ERROR,
        ERROR: e
      });
    }
  };
}

export function logoutUser (data) {
  return async dispatch => {
    try {
      const logoutResult = await post('/api/logoutUser', data);
      dispatch({
        type: actionTypes.LOGOUT_USER_SUCCESS,
        logoutResult: logoutResult
      });
    } catch(e) {
      dispatch({
        type: actionTypes.LOGOUT_USER_ERROR,
        ERROR: e
      });
    }
  };
}

export function authenticateUser (data) {
  return async dispatch => {
    try {
      const authenticateResult = await post('/api/authenticateUser', data);
      dispatch({
        type: actionTypes.AUTHENTICATE_USER_SUCCESS,
        authenticateResult: authenticateResult
      });
    } catch(e) {
      dispatch({
        type: actionTypes.AUTHENTICATE_USER_ERROR,
        ERROR: e
      });
    }
  };
}
