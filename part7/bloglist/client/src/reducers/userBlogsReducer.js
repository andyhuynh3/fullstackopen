import userService from '../services/users';

const userBlogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_USER_BLOGS': {
      return action.users;
    }
    default: return state;
  }
};

export const initializeUserBlogs = () => async (dispatch) => {
  const users = await userService.getAll();
  dispatch({
    type: 'INITIALIZE_USER_BLOGS',
    users,
  });
};

export default userBlogReducer;
