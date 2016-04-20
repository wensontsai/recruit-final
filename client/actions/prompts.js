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

export function saveEditPrompt (data) {
  return async dispatch => {
    try {
      const editResult = await post('/api/editPrompt', data);

      dispatch({
        type: actionTypes.EDIT_PROMPT_SUCCESS,
        editResult: editResult
      });
    } catch(e) {
      dispatch({
        type: actionTypes.EDIT_PROMPT_ERROR,
        ERROR: e
      });
    }
  };
}
export function deletePrompt (data) {
  return async dispatch => {
    try {
      const deleteResult = await del('/api/deletePrompt/' +data.promptId);
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
export function toggleEditMode (data) {
  data.editObj[data.id] = {
    mode: true,
    data: data.editObj[data.id].data
  };

  return async dispatch => {
    dispatch({
      type: actionTypes.TOGGLE_EDIT_MODE,
      data: data,
      promptsAll: data.promptsAll
    });
  };
}

