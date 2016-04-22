import * as actionTypes from '../actionTypes/notifications';

export function addNotifications (notifications) {
  return async dispatch => {
    dispatch({
      type: actionTypes.ADD_NOTIFICATION,
      notifications: notifications
    });
  };
}
export function clearNotifications (notifications) {
  console.log('action now', notifications);
  notifications.messagesArray.shift();
  return async dispatch => {
    dispatch({
      type: actionTypes.CLEAR_NOTIFICATION,
      notifications: notifications
    });
  };
}