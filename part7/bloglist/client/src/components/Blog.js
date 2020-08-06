import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import {
  likeBlog, deleteBlog,
  initializeBlogs,
} from '../reducers/blogReducer';

const Blog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { authenticatedUser, blogs } = useSelector((state) => state);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const blogMatch = useRouteMatch('/blogs/:id');
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  const handleLike = async () => {
    const {
      id, likes, author, title, url, user,
    } = blog;
    const updatedBlog = {
      user,
      likes: likes + 1,
      author,
      title,
      url,
    };
    dispatch(likeBlog(id, updatedBlog));
  };

  const handleDelete = async () => {
    // eslint-disable-next-line no-alert
    await dispatch(deleteBlog(blog));
    history.push('/');
  };

  const removeButton = () => {
    try {
      if (authenticatedUser.username === blog.user.username) {
        return (
          <button id="remove-button" type="submit" onClick={handleDelete}>remove</button>
        );
      }
    } catch (err) {
      return <></>;
    }
  };

  if (blog) {
    return (
      <div>
        <h2>{blog.title}</h2>
        <div><a href={blog.url} target="_blank">{blog.url}</a></div>
        <div className="likes">
          {blog.likes}
          {' '}
          likes
          <button onClick={handleLike}>like</button>
        </div>
        added by
        {' '}
        {blog.author}
        <div>
          {' '}
          {removeButton()}
        </div>
      </div>
    );
  }
  return <></>;
};

export default Blog;
