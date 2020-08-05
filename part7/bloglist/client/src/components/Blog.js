import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVisible, likeBlog, deleteBlog } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

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
    dispatch(likeBlog(id, updatedBlog));
  };

  const handleDelete = async () => {
    // eslint-disable-next-line no-alert
    dispatch(deleteBlog(blog));
  };

  const removeButton = () => {
    try {
      if (user.username === blog.user.username) {
        return (
          <button id="remove-button" type="submit" onClick={handleDelete}>remove</button>
        );
      }
    } catch (err) {
      return <></>;
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    dispatch(setVisible(blog.id));
  };

  const hideWhenVisible = { display: blog.visible ? 'none' : '' };
  const showWhenVisible = { display: blog.visible ? '' : 'none' };

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
