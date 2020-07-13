const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helpers = require('./test_helpers');

const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  jest.setTimeout(30000);
  await Blog.deleteMany();
  const blogObjects = helpers.initialBlogPosts.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('all blog posts are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helpers.initialBlogPosts.length);
});

test('blog document has id property', async () => {
  const response = await api.get('/api/blogs');
  const blog = response.body[0];
  expect(blog.id).toBeDefined();
});

test('a blog can be created', async () => {
  const newBlog = {
    _id: '5a422b3a1b54a676234d17f1',
    title: 'HTML is easy',
    author: 'James Bond',
    url: 'http://www.mycoolblog.com',
    likes: 3,
    __v: 0,
  };
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogs = await helpers.blogsInDb();
  expect(blogs).toHaveLength(helpers.initialBlogPosts.length + 1);
  const expectedReturnedBlog = { ...newBlog };
  expectedReturnedBlog.id = expectedReturnedBlog._id;
  delete expectedReturnedBlog._id;
  delete expectedReturnedBlog.__v;
  expect(response.body).toEqual(expectedReturnedBlog);
});

test('missing likes property defaults to 0', async () => {
  const newBlog = {
    _id: '5a422b3a1b54a676234d17f1',
    title: 'HTML is easy',
    author: 'James Bond',
    url: 'http://www.mycoolblog.com',
    __v: 0,
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(response.body.likes).toEqual(0);
});

test('POST returns 400 if title and url properties missing', async () => {
  const newBlog = {
    _id: '5a422b3a1b54a676234d17f1',
    author: 'James Bond',
    __v: 0,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
