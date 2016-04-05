import * as actionTypes from '../actionTypes/sessions.js';
import { get, post, del } from '../utils/api';

var Api = require('../utils/api');


export function login (data) {
  return async dispatch => {
    try {
      const loginResult = await post('/api/loginUser', data);
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        loginResult: loginResult
      });
    } catch(e) {
      dispatch({
        type: actionTypes.LOGIN_ERROR,
        ERROR: e
      });
    }
  };
}

export function logout (data) {
  return async dispatch => {
    try {
      const logoutResult = await post('/api/logoutUser', data);
      dispatch({
        type: actionTypes.LOGOUT_SUCCESS,
        logoutResult: logoutResult
      });
    } catch(e) {
      dispatch({
        type: actionTypes.LOGOUT_ERROR,
        ERROR: e
      });
    }
  };
}
