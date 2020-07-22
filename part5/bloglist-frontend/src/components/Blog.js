import React, { useState } from 'react';

const Blog = (props) => {
  const [visible, setVisible] = useState(false);
  const {
    blog, handleLike, removeButton,
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

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="hidden">
        {blog.title}
        {' '}
        {blog.author}
        <button id="view-button" type="submit" onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="show">
        {blog.title}
        {' '}
        {blog.author}
        <button id="hide-button" type="submit" onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        <div className="likes">{blog.likes}</div>
        <button id="like-button" type="submit" onClick={handleLike}>like</button>
        <br />
        {blog.username}
        <br />
        {removeButton()}
      </div>
    </div>
  );
};

export default Blog;
