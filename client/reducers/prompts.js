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

const toggleEditMode = (state, action) => {
  const currentPrompts = state;
  currentPrompts.prompts.editObj[action.data.id] = {
    mode: true,
    data: currentPrompts.prompts.editObj[action.data.id].data
  };
  return merge({}, state, {
    prompts: {
      promptsAll: currentPrompts.prompts.promptsAll,
      actionStatus: 'toggleEditMode successful!',
      editObj: currentPrompts.prompts.editObj
    }
  });
};
const handleEditPrompt = (state, action) => {
  const currentPrompts = state;
  currentPrompts.prompts.editObj[action.data.id] = {
    mode: true,
    data: currentPrompts.prompts.editObj[action.data.id].data
  };
  return merge({}, state, {
    prompts: {
      promptsAll: currentPrompts.prompts.promptsAll,
      actionStatus: 'handleEditPrompt successful!',
      editObj: currentPrompts.prompts.editObj
    }
  });
};
const saveEditPrompt = (state, action) => {
  const currentPrompts = state;
  currentPrompts.prompts.editObj[action.data.id] = {
    mode: null,
    data: action.data.data
  };

  return merge({}, state, {
    prompts: {
      promptsAll: currentPrompts.prompts.promptsAll,
      actionStatus: 'saveEditPrompt successful!',
      editObj: currentPrompts.prompts.editObj
    }
  });
};

const deletePrompt = (state, action) => {
  console.log('^^^ reducer action');
  console.log(action);
  return assign({}, state, {
    prompts: {
      promptsAll: action.deleteResult.prompts,
      actionStatus: 'deletePrompt successful!',
      editObj: action.deleteResult.editObj
    }
  });
};


export default function prompts (state = initialState, action) {
  return ({
    [actionTypes.QUERY_ALL_PROMPTS_LIST_SUCCESS]: queryAllPromptsList,
    [actionTypes.ADD_PROMPT_SUCCESS]: addPrompt,
    [actionTypes.DELETE_PROMPT_SUCCESS]: deletePrompt,

    [actionTypes.TOGGLE_EDIT_MODE]: toggleEditMode,
    [actionTypes.SAVE_EDIT_PROMPT]: saveEditPrompt,
  }[action.type] || ((s) => s))(state, action);
}
