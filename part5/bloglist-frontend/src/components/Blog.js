import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = (props) => {
  const [visible, setVisible] = useState(false);
  const {
    blog, blogs, setBlogs, user,
  } = props;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
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

  const handleDelete = async () => {
    // eslint-disable-next-line no-alert
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
    const { id } = blog;
    const response = await blogService.del(id, user.token);
    console.log(response.json);
    const remainingBlogs = blogs.filter((b) => b.id !== id);
    setBlogs(remainingBlogs);
  };

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  // eslint-disable-next-line consistent-return
  const removeButton = () => {
    try {
      if (user.username === blog.user.username) {
        return (
          <button type="submit" onClick={handleDelete}>remove</button>
        );
      }
    } catch (err) {
      return <></>;
    }
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title}
        {' '}
        {blog.author}
        <button type="submit" onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title}
        {' '}
        {blog.author}
        <button type="submit" onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        {blog.likes}
        <button type="submit" onClick={handleLike}>like</button>
        <br />
        {blog.username}
        <br />
        {removeButton()}
      </div>
    </div>
  );
};

export default Blog;
