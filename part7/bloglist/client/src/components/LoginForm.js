import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import { setUsername, setPassword } from '../reducers/loginFormReducer';
import { setNotification } from '../reducers/notificationReducer';
import { login } from '../reducers/authReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { username, password } = useSelector((state) => state.loginInfo);

  const handleUsername = ({ target }) => {
    dispatch(setUsername(target.value));
  };

  const handlePassword = ({ target }) => {
    dispatch(setPassword(target.value));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login(username, password));
      dispatch(setNotification({
        message: `Logged in as ${username}`,
        className: 'success',
      }));
    } catch (err) {
      dispatch(setNotification({
        message: 'wrong username or password',
        className: 'error',
      }));
    }
    dispatch(setUsername(''));
    dispatch(setPassword(''));
  };

  return (
    <div>
      <h2>Log in</h2>
      <form>
        <div>
          <TextField
            id="username"
            type="text"
            label="username"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div>
          <TextField
            id="password"
            type="password"
            label="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div>
          <button type="submit" onClick={handleLogin}>login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
