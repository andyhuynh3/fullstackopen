import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setPassword } from '../reducers/loginFormReducer';
import { setNotification } from '../reducers/notificationReducer';
import { login } from '../reducers/userReducer';

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
      <h2>log in to application</h2>
      <form>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="text"
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
