import * as actionTypes from '../actionTypes/sessions.js';
import { get, post, del } from '../utils/api';
import { Link, browserHistory } from 'react-router';

var Api = require('../utils/api');


export function loginUser (data) {
  return async dispatch => {
    try {
      const loginResult = await post('/api/loginUser', data);
      
      if (loginResult.success === true) {
        // set Token as cookie
        // localStorage.setItem('token', loginResult.token);
        // console.log('if logged in this is token: ', localStorage.getItem('token'));
        document.cookie = 'token=' +loginResult.token;

        // redirect to Candidates page
        browserHistory.push('/candidates');
      } else {
        console.log(loginResult.message);
      }

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

      // localStorage.removeItem('token');
      // console.log('if logged in this is token: ', localStorage.getItem('token'));
      if (logoutResult.success === true) {
        // Remove cookie on logout success
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";


        // redirect to Candidates page
        browserHistory.push('/login');
      }
     

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
