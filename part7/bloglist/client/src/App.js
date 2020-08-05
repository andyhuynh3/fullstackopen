import React, { useEffect, useRef } from 'react';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import BlogList from './components/BlogList';
import {
  initializeBlogs,
} from './reducers/blogReducer';
import { initializeUser } from './reducers/userReducer';
import LoginForm from './components/LoginForm';
import Nav from './components/Nav';
import {
  Route, Switch, Link, useHistory, useRouteMatch,
} from 'react-router-dom';
import Users from './components/Users';
import User from './components/User';
import { initializeUserBlogs } from './reducers/userBlogsReducer';

const App = () => {
  const dispatch = useDispatch();
  const { user, userBlogs } = useSelector((state) => state);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(initializeUserBlogs());
    };
    fetchData();
  }, [dispatch]);

  const blogFormRef = useRef();

  const userMatch = useRouteMatch('/users/:id');
  const userBlog = userMatch
    ? userBlogs.find((userBlog) => userBlog.id === userMatch.params.id)
    : null;

  return (
    <div>
      <Notification />
      {user
        && (
        <>
          <Nav />
          <Switch>
            <Route path="/users/:id">
              <User userBlog={userBlog} />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Togglable buttonLabel="add new" ref={blogFormRef}>
                <BlogForm blogFormRef={blogFormRef} />
              </Togglable>
              <BlogList />
            </Route>
          </Switch>
        </>
        )}
      {user === null && <LoginForm />}
    </div>
  );
};

export default App;
