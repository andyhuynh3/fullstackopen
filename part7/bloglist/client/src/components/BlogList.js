import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  TableContainer,
  Table, TableBody,
  TableCell, TableRow, Paper,
} from '@material-ui/core';
import Blog from './Blog';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';

const BlogList = () => {
  const { blogs } = useSelector((state) => state);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs.sort(
            (a, b) => b.likes - a.likes,
          ).map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
              <TableCell>
                {blog.author}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlogList;
