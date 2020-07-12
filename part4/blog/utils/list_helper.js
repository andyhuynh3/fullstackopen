const { groupBy } = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (total, item) => total + item.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
    const favorite = blogs.find((blog) => blog.likes === maxLikes);
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes,
    };
  }
  return {};
};

const mostBlogs = (blogs) => {
  if (blogs.length > 0) {
    const blogsByAuthor = groupBy(blogs, 'author');
    let authorWithMostBlogs = null;
    // eslint-disable-next-line no-restricted-syntax
    for (const [author, blogList] of Object.entries(blogsByAuthor)) {
      if (authorWithMostBlogs === null
          || blogList.length > authorWithMostBlogs.blogs
      ) {
        authorWithMostBlogs = {
          author,
          blogs: blogList.length,
        };
      }
    }
    return authorWithMostBlogs;
  }
  return {};
};

const mostLikes = (blogs) => {
  if (blogs.length > 0) {
    const blogsByAuthor = groupBy(blogs, 'author');
    let authorWithMostBlogLikes = null;
    // eslint-disable-next-line no-restricted-syntax
    for (const [author, blogList] of Object.entries(blogsByAuthor)) {
      const authorTotalLikes = totalLikes(blogList);
      if (authorWithMostBlogLikes === null || (authorTotalLikes > authorWithMostBlogLikes.likes)) {
        authorWithMostBlogLikes = {
          author,
          likes: authorTotalLikes,
        };
      }
    }
    return authorWithMostBlogLikes;
  }
  return {};
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
};
