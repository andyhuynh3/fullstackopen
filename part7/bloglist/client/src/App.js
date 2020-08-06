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
import { initializeAuthenticatedUser } from './reducers/authReducer';
import LoginForm from './components/LoginForm';
import Nav from './components/Nav';
import {
  Route, Switch, Link, useHistory, useRouteMatch,
} from 'react-router-dom';
import Users from './components/Users';
import User from './components/User';
import { initializeUsers } from './reducers/usersReducer';
import Blog from './components/Blog';
import Container from '@material-ui/core/Container';

const App = () => {
  const dispatch = useDispatch();
  const { authenticatedUser, users, blogs } = useSelector((state) => state);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(initializeAuthenticatedUser());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(initializeUsers());
    };
    fetchData();
  }, [dispatch]);

  const blogFormRef = useRef();

  const userMatch = useRouteMatch('/users/:id');
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  return (
    <Container>
      <Notification />
      {authenticatedUser
        && (
        <>
          <Nav />
          <Switch>
            <Route path="/users/:id">
              <User user={user} />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/blogs/:id">
              <Blog />
            </Route>
            <Route path={['/', '/blogs']}>
              <Togglable buttonLabel="add new" ref={blogFormRef}>
                <BlogForm blogFormRef={blogFormRef} />
              </Togglable>
              <BlogList />
            </Route>
          </Switch>
        </>
        )}
      {authenticatedUser === null && <LoginForm />}
    </Container>
  );
};

export default App;
