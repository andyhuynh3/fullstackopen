import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { setTitle, setAuthor, setUrl } from '../reducers/blogFormReducer';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();
  const {
    title, author, url,
  } = useSelector((state) => state.newBlogInfo);

  const handleTitleChange = ({ target }) => {
    dispatch(setTitle(target.value));
  };

  const handleAuthorChange = ({ target }) => {
    dispatch(setAuthor(target.value));
  };

  const handleUrlChange = ({ target }) => {
    dispatch(setUrl(target.value));
  };

  const addBlog = async (event) => {
    event.preventDefault();
    await dispatch(createBlog({ title, author, url }));
    blogFormRef.current.toggleVisibility();
    dispatch(setTitle(''));
    dispatch(setAuthor(''));
    dispatch(setUrl(''));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="title"
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <TextField
            label="author"
            id="author"
            type="text"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <TextField
            label="url"
            id="url"
            type="text"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <Button id="create-blog" type="submit" variant="outlined" size="small" color="primary">create</Button>
      </form>
    </div>
  );
};

export default BlogForm;
