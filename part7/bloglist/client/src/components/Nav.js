import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Button, Typography,
} from '@material-ui/core';
import { setNotification } from '../reducers/notificationReducer';
import { logout } from '../reducers/authReducer';

const Nav = () => {
  const dispatch = useDispatch();
  const authenticatedUser = useSelector((state) => state.authenticatedUser);

  const handleLogOut = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedInUser');
    dispatch(setNotification(
      {
        message: `Logged out of ${authenticatedUser.username}`,
        className: 'success',
      },
    ));
    dispatch(logout());
  };

  return (
    <AppBar color="primary" position="sticky" style={{ margin: 0 }}>
      <Toolbar>
        <Typography color="inherit" style={{ flex: 1 }}>
          <Button color="inherit" component={Link} to="/">blogs</Button>
          <Button color="inherit" component={Link} to="/users">users</Button>
        </Typography>
        {authenticatedUser.name}
        <Button id="log-out-button" color="inherit" type="submit" onClick={handleLogOut} component={Link} to="/">log-out</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
