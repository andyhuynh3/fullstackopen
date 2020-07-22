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

  const handleLike = (blog) => async () => {
    const {
      id, likes, author, title, url, user,
    } = blog;
    const updatedBlog = {
      user: user.id,
      likes: likes + 1,
      author,
      title,
      url,
    };
    const returnedBlog = await blogService.update(id, updatedBlog);
    const updatedBlogs = blogs.map((b) => (b.id !== id ? b : returnedBlog));
    setBlogs(updatedBlogs);
  };

  const handleDelete = (blog) => async () => {
    // eslint-disable-next-line no-alert
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
    const { id } = blog;
    const response = await blogService.del(id, user.token);
    console.log(response.json);
    const remainingBlogs = blogs.filter((b) => b.id !== id);
    setBlogs(remainingBlogs);
  };

  const removeButton = (blog) => () => {
    try {
      if (user.username === blog.user.username) {
        return (
          <button id="remove-button" type="submit" onClick={handleDelete(blog)}>remove</button>
        );
      }
    } catch (err) {
      return <></>;
    }
  };

  const blogFormRef = useRef();

  const addBlogBase = async (blog) => {
    const returnedBlog = await blogService.create(blog, user.token);
    setBlogs([...blogs, returnedBlog]);
    setNotificationHelper(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      'success',
    );
    blogFormRef.current.toggleVisibility();
  };

  const newBlogForm = () => (
    <Togglable buttonLabel="add new" ref={blogFormRef}>
      <BlogForm
        addBlogBase={addBlogBase}
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
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      <p>
        {user.name}
        {' '}
        logged in
        <button id="log-out-button" type="submit" onClick={handleLogOut}>log-out</button>
      </p>
      {newBlogForm()}
      {blogs.sort(
        (a, b) => b.likes - a.likes,
      ).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike(blog)}
          removeButton={removeButton(blog)}
        />
      ))}
    </div>
  );
};

export default App;
