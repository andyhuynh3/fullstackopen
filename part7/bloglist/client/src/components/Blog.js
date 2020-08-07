import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import {
  likeBlog, deleteBlog,
  initializeBlogs, addComment,
} from '../reducers/blogReducer';

const Blog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { authenticatedUser, blogs } = useSelector((state) => state);
  const [comment, setComment] = useState('');

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

  const handleAddComment = async (event) => {
    event.preventDefault();
    dispatch(addComment(blog, comment));
  };

  console.log(blog);

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
        <div>
          <h3>comments</h3>
          <form onSubmit={handleAddComment}>
            <div><TextField type="text" label="add comment" onChange={({ target }) => setComment(target.value)} /></div>
            <div>
              <Button id="add-comment" type="submit" variant="outlined" size="small" color="primary">Add</Button>
            </div>
          </form>
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return <></>;
};

export default Blog;
