import React from 'react';

const User = ({ user }) => (
  <div>
    <h2>{user && user.username}</h2>
    <b>added blogs</b>
    <ul>
      {user && user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
    </ul>
  </div>
);

export default User;
