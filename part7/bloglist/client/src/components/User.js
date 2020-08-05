import React from 'react';

const User = ({ userBlog }) => {
  console.log(userBlog);
  return (
    <div>
      <h2>{userBlog && userBlog.username}</h2>
      <b>added blogs</b>
      <ul>
        {userBlog && userBlog.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  );
};

export default User;
