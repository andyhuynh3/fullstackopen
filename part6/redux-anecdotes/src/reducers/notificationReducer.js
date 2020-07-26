const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'UNSET_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

export const setNotification = (notification) => ({
  type: 'SET_NOTIFICATION',
  notification,
});

export const unsetNotification = () => ({
  type: 'UNSET_NOTIFICATION',
});

export default notificationReducer;
