const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'CLEAR_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

export const timeoutReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_TIMEOUT_ID':
      state = action.timeoutId;
      return state;
    default: return state;
  }
};

export const setNotification = (notification) => async (dispatch, getState) => {
  const existingTimeoutId = getState().timeout;
  if (existingTimeoutId !== null) {
    clearTimeout(existingTimeoutId);
  }

  dispatch({
    type: 'SET_NOTIFICATION',
    notification,
  });

  const timeoutId = setTimeout(() => {
    dispatch({
      type: 'CLEAR_NOTIFICATION',
    });
  }, 5000);

  dispatch({
    type: 'SET_TIMEOUT_ID',
    timeoutId,
  });
};

export default notificationReducer;
