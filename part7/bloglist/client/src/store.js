import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';
import loginFormReducer from './reducers/loginFormReducer';
import blogFormReducer from './reducers/blogFormReducer';
import userBlogsReducer from './reducers/userBlogsReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  notification: notificationReducer,
  loginInfo: loginFormReducer,
  newBlogInfo: blogFormReducer,
  userBlogs: userBlogsReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
