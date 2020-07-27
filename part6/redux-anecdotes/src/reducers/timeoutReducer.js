const timeoutReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_TIMEOUT_ID':
      state = action.timeoutId;
      return state;
    default: return state;
  }
};

export default timeoutReducer;
