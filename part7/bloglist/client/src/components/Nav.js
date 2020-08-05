import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { logout } from '../reducers/userReducer';

const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogOut = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedInUser');
    dispatch(setNotification(
      {
        message: `Logged out of ${user.username}`,
        className: 'success',
      },
    ));
    dispatch(logout());
  };

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name}
        {' '}
        logged in
        <button id="log-out-button" type="submit" onClick={handleLogOut}>log-out</button>
      </p>
    </div>
  );
};

export default Nav;
