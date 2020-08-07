const commentRouter = require('express').Router();
const Comment = require('../models/comment');
const Blog = require('../models/blog');

commentRouter.get('/', async (request, response) => {
  const comments = await Comment.find({}).populate('blog', {
    title: true, author: true, url: true, likes: true,
  });
  response.json(comments);
});

commentRouter.post('/', async (request, response) => {
  const { body } = request;
  const comment = new Comment({
    content: body.content,
    blog: body.blog_id,
  });
  const savedComment = await comment.save();
  const blog = await Blog.findById(body.blog_id);
  blog.comments = [...blog.comments, savedComment._id];
  await blog.save();
  response.status(201).json(savedComment);
});

module.exports = commentRouter;
