import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ addBlogBase }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

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
    await addBlogBase({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            name="title"
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            name="author"
            id="author"
            type="text"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            name="url"
            id="url"
            type="text"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button id="create-blog" type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  addBlogBase: PropTypes.func.isRequired,
};

export default BlogForm;
