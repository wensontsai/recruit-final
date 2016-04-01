import * as actionTypes from '../actionTypes/prompts';
import merge from 'lodash.merge';

const initialState = {
  prompts: {
    promptsAll: [],
    actionStatus: ''
  }
};

const queryAllPromptsList = (state, action) => {
  return merge({}, state, {
    prompts: {
      promptsAll: action.queryResult,
      actionStatus: 'queryAllPrompts successful!'
    }
  });
};

const addPrompt = (state, action) => {
  return merge({}, state, {
    prompts: {
      promptsAll: action.queryResult,
      actionStatus: 'Adding Prompt Successful!'
    }
  });
};

const editPrompt = (state, action) => {
  return merge({}, state, {
    prompts: {    
      actionStatus: 'Editing Prompt Successful!'
    }
  });
};

const deletePrompt = (state, action) => {
  return merge({}, state, {
    prompts: {
      promptsAll: action.deleteResult,
      actionStatus: 'Deleting Prompt Successful!'
    }
  });
};


export default function prompts (state = initialState, action) {
  return ({
    [actionTypes.QUERY_ALL_PROMPTS_LIST_SUCCESS]: queryAllPromptsList,
    [actionTypes.ADD_PROMPT_SUCCESS]: addPrompt,
    [actionTypes.EDIT_PROMPT_SUCCESS]: editPrompt,
    [actionTypes.DELETE_PROMPT_SUCCESS]: deletePrompt,
  }[action.type] || ((s) => s))(state, action);
}
