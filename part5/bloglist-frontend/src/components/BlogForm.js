import React, { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

const BlogForm = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const {
    blogs, setBlogs, setNotificationHelper, token, blogFormRef,
  } = props;

  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
  };

  const handleAuthorChange = ({ target }) => {
    setAuthor(target.value);
  };

  const handleUrlChange = ({ target }) => {
    setUrl(target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const blog = { title, author, url };
    console.log(token);
    const returnedBlog = await blogService.create(blog, token);
    setBlogs([...blogs, returnedBlog]);
    setNotificationHelper(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      'success',
    );
    setTitle('');
    setAuthor('');
    setUrl('');
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNotificationHelper: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  blogFormRef: PropTypes.object.isRequired,
};

export default BlogForm;
