import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
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

  const handleNewBlog = async (event) => {
    event.preventDefault();
    const blog = { title, author, url };
    console.log(blog);
    const returnedBlog = await blogService.create(blog, user.token);
    setBlogs([...blogs, returnedBlog]);
    setNotificationHelper(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      'success',
    );
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const newBlogForm = () => (
    <div>
      <form>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" onClick={handleNewBlog}>create</button>
      </form>
    </div>
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
      <h2>create new</h2>
      {newBlogForm()}
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
