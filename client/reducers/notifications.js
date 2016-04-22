import * as actionTypes from '../actionTypes/notifications';
import merge from 'lodash.merge';

const initialState = {
  messagesArray: []
};

const addNotification = (state, action) => {
  return merge({}, state, {
    messagesArray: action.notifications.messagesArray,
    level: action.notifications.level,
    dismissAfter: action.notifications.dismissAfter,
    type: action.notifications.type,
    customComponent: action.notifications.customComponent
  });
};
const clearNotification = (state, action) => {
  return merge({}, state, {
    messagesArray: action.notifications.messagesArray
  });
};

export default function notifications (state = initialState, action) {
  return ({
    [actionTypes.ADD_NOTIFICATION]: addNotification,
    [actionTypes.CLEAR_NOTIFICATION]: clearNotification

  }[action.type] || ((s) => s))(state, action);
}