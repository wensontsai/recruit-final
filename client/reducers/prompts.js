import * as actionTypes from '../actionTypes/prompts';
import merge from 'lodash.merge';
import assign from 'lodash.assign';

const initialState = {
  prompts: {
    promptsAll: [],
    actionStatus: '',
    editObj: {}
  }
};

const queryAllPromptsList = (state, action) => {
  return merge({}, state, {
    prompts: {
      promptsAll: action.queryResult.prompts,
      actionStatus: 'queryAllPrompts successful!',
      editObj: action.queryResult.editObj
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
  console.log(action.data.id);
  const currentPrompts = state;
  console.log(currentPrompts);
  currentPrompts.prompts.editObj[action.data.id] = true;

  return merge({}, state, {
    currentPrompts
  });
};
const saveEditPrompt = (state, action) => {
  console.log(action.data.id);
  const currentPrompts = state;
  console.log(currentPrompts);
  currentPrompts.prompts.editObj[action.data.id] = null;

  return merge({}, state, {
    currentPrompts
  });
};

const deletePrompt = (state, action) => {
  return assign({}, state, {
    prompts: {
      promptsAll: action.queryResult.prompts,
      actionStatus: 'deletePrompt successful!',
      editObj: action.queryResult.editObj
    }
  });
};


export default function prompts (state = initialState, action) {
  return ({
    [actionTypes.QUERY_ALL_PROMPTS_LIST_SUCCESS]: queryAllPromptsList,
    [actionTypes.ADD_PROMPT_SUCCESS]: addPrompt,
    [actionTypes.DELETE_PROMPT_SUCCESS]: deletePrompt,

    [actionTypes.EDIT_PROMPT]: editPrompt,
    [actionTypes.SAVE_EDIT_PROMPT]: saveEditPrompt,
  }[action.type] || ((s) => s))(state, action);
}
