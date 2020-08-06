import userService from '../services/users';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_USERS': {
      return action.users;
    }
    default: return state;
  }
};

export const initializeUsers = () => async (dispatch) => {
  const users = await userService.getAll();
  dispatch({
    type: 'INITIALIZE_USERS',
    users,
  });
};

export default usersReducer;
