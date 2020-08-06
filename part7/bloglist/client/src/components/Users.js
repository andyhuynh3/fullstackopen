import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeUsers } from '../reducers/usersReducer';

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(initializeUsers());
    };
    fetchData();
  }, [dispatch]);

  const { users } = useSelector((state) => state);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th><b>user</b></th>
            <th><b>blogs created</b></th>
          </tr>
          {users.map((userBlog) => (
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
