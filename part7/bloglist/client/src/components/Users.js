import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeUserBlogs } from '../reducers/userBlogsReducer';

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(initializeUserBlogs());
    };
    fetchData();
  }, [dispatch]);

  const { userBlogs } = useSelector((state) => state);

  console.log(userBlogs);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th><b>user</b></th>
            <th><b>blogs created</b></th>
          </tr>
          {userBlogs.map((userBlog) => (
            <tr key={userBlog.id}>
              <td><Link to={`/users/${userBlog.id}`}>{userBlog.username}</Link></td>
              <td>{userBlog.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
