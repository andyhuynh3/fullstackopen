import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import blogReducer from './reducers/blogReducer';
import authReducer from './reducers/authReducer';
import notificationReducer from './reducers/notificationReducer';
import loginFormReducer from './reducers/loginFormReducer';
import blogFormReducer from './reducers/blogFormReducer';
import usersReducer from './reducers/usersReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  authenticatedUser: authReducer,
  notification: notificationReducer,
  loginInfo: loginFormReducer,
  newBlogInfo: blogFormReducer,
  users: usersReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
