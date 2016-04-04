import * as actionTypes from '../actionTypes/prompts.js';
import { get, post, del } from '../utils/api';

var Api = require('../utils/api');

export function queryAllPromptsList () {
  return async dispatch => {
    try {
      const queryResult = await get('/api/queryAllPromptsList');
      dispatch({
        type: actionTypes.QUERY_ALL_PROMPTS_LIST_SUCCESS,
        queryResult: queryResult
      });

    } catch(e) {
      dispatch({
        type: actionTypes.QUERY_ALL_PROMPTS_LIST_ERROR,
        ERROR: e
      });
    }
  };
}

export function addPrompt (data) {
  return async dispatch => {
    try {
      const addResult = await post('/api/addPrompt', data);
      dispatch({
        type: actionTypes.ADD_PROMPT_SUCCESS
      });

      const queryResult = await get('/api/queryAllPromptsList');
      dispatch({
        type: actionTypes.QUERY_ALL_PROMPTS_LIST_SUCCESS,
        queryResult: queryResult
      });

    } catch(e) {
      dispatch({
        type: actionTypes.ADD_PROMPT_ERROR,
        ERROR: e
      }),
      dispatch({
        type: actionTypes.QUERY_ALL_PROMPTS_LIST_ERROR,
        ERROR: e
      });
    }
  };
}
export function deletePrompt (data) {
  return async dispatch => {
    try {
      const deleteResult = await post('/api/deletePrompt', data);

      console.log(deleteResult);
      dispatch({
        type: actionTypes.DELETE_PROMPT_SUCCESS,
        deleteResult: deleteResult
      });
    } catch(e) {
      dispatch({
        type: actionTypes.DELETE_PROMPT_ERROR,
        ERROR: e
      });
    }
  };
}
export function editPrompt (data) {
  console.log(data);
  return async dispatch => {
    dispatch({
      type: actionTypes.EDIT_PROMPT,
      data: data
    });
  };
}
export function handleEditPrompt (data) {
  console.log(data);
  return async dispatch => {
    dispatch({
      type: actionTypes.HANDLE_EDIT_PROMPT,
      data: data
    });
  };
}
export function saveEditPrompt (data) {
  console.log(data);
  return async dispatch => {
    dispatch({
      type: actionTypes.SAVE_EDIT_PROMPT,
      data: data
    });
  };
}

