import loginService from '../services/login';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return action.data.user;
    }
    case 'LOGOUT': {
      return null;
    }
    case 'INITIALIZE_USER': {
      state = action.data.user;
      return state;
    }
    default: return state;
  }
};

export const initializeUser = () => async (dispatch) => {
  const loggedInUser = window.localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    dispatch({
      type: 'INITIALIZE_USER',
      data: { user: JSON.parse(loggedInUser) },
    });
  }
};

export const login = (username, password) => async (dispatch) => {
  const credentials = {
    username, password,
  };
  const user = await loginService.login(credentials);
  window.localStorage.setItem('loggedInUser', JSON.stringify(user));
  dispatch({
    type: 'LOGIN',
    data: { user },
  });
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: 'LOGOUT',
  });
};

export default userReducer;
