import * as actionTypes from '../actionTypes/notifications';

export function addNotifications (notifications) {
  return async dispatch => {
    dispatch({
      type: actionTypes.ADD_NOTIFICATION,
      notifications: notifications
    });
  };
}
export function clearNotifications () {
  console.log("@##$%#$%#$%#$%#$% helllo i'm here!");
  return async dispatch => {
    dispatch({
      type: actionTypes.CLEAR_NOTIFICATION,
    });
  };
}