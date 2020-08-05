import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './Blog';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state);

  return (
    <div>
      {blogs.sort(
        (a, b) => b.likes - a.likes,
      ).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default BlogList;
