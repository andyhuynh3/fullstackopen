import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const setNotificationHelper = (message, className) => {
    setNotification({
      message,
      className,
    });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const credentials = {
      username,
      password,
    };
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      setUser(user);
      setNotificationHelper(
        `Logged in as ${user.username}`,
        'success',
      );
    } catch (err) {
      setNotificationHelper(
        'wrong username or password',
        'error',
      );
    }
    setUsername('');
    setPassword('');
  };

  const handleUsername = ({ target }) => {
    setUsername(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleLogOut = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedInUser');
    setNotificationHelper(
      `Logged out of ${user.username}`,
      'success',
    );
    setUser(null);
  };

  const blogFormRef = useRef();

  const newBlogForm = () => (
    <Togglable buttonLabel="add new" ref={blogFormRef}>
      <BlogForm
        blogs={blogs}
        setBlogs={setBlogs}
        setNotificationHelper={setNotificationHelper}
        token={user.token}
        blogFormRef={blogFormRef}
      />
    </Togglable>
  );

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <h2>log in to application</h2>
        <form>
          <div>
            username
            <input
              type="text"
              value={username}
              onChange={handleUsername}
            />
          </div>
          <div>
            password
            <input
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
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      <p>
        {user.name}
        {' '}
        logged in
        <button type="submit" onClick={handleLogOut}>log-out</button>
      </p>
      {newBlogForm()}
      {blogs.sort(
        (a, b) => b.likes - a.likes,
      ).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
