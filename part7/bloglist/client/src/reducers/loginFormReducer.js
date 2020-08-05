const initialState = {
  username: '',
  password: '',
};

const loginFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERNAME': {
      return { ...state, username: action.username };
    }
    case 'SET_PASSWORD': {
      return { ...state, password: action.password };
    }
    default: return state;
  }
};

export const setUsername = (username) => async (dispatch) => {
  dispatch({
    type: 'SET_USERNAME',
    username,
  });
};

export const setPassword = (password) => async (dispatch) => {
  dispatch({
    type: 'SET_PASSWORD',
    password,
  });
};

export default loginFormReducer;
