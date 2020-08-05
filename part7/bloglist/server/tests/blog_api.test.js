const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helpers = require('./test_helpers');

const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');
const { initialUsers } = require('./test_helpers');

beforeEach(async () => {
  jest.setTimeout(30000);
  await Blog.deleteMany();
  const blogObjects = helpers.initialBlogPosts.map((blog) => new Blog(blog));
  const blogPromiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(blogPromiseArray);
  await User.deleteMany();
  const userPromiseArray = helpers.initialUsers.map((user) => api.post('/api/users').send(user));
  await Promise.all(userPromiseArray);
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
    title: 'HTML is easy',
    author: 'James Bond',
    url: 'http://www.mycoolblog.com',
    likes: 3,
  };

  const user = {
    username: initialUsers[0].username,
    password: initialUsers[0].password,
  };

  const loginResponse = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${loginResponse.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogs = await helpers.blogsInDb();
  expect(blogs).toHaveLength(helpers.initialBlogPosts.length + 1);
  const expectedReturnedBlog = { ...newBlog };
  expectedReturnedBlog.id = expectedReturnedBlog._id;
  delete expectedReturnedBlog._id;
  delete expectedReturnedBlog.__v;
  expect(response.body.title).toEqual(newBlog.title);
});

test('adding a new blog fails with 401 if no token is provided', async () => {
  const newBlog = {
    title: 'HTML is easy',
    author: 'James Bond',
    url: 'http://www.mycoolblog.com',
    likes: 3,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/);
});

test('missing likes property defaults to 0', async () => {
  const newBlog = {
    title: 'HTML is easy',
    author: 'James Bond',
    url: 'http://www.mycoolblog.com',
  };

  const user = {
    username: initialUsers[0].username,
    password: initialUsers[0].password,
  };

  const loginResponse = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${loginResponse.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(response.body.likes).toEqual(0);
});

test('POST returns 400 if title and url properties missing', async () => {
  const user = {
    username: initialUsers[0].username,
    password: initialUsers[0].password,
  };

  const loginResponse = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const newBlog = {
    _id: '5a422b3a1b54a676234d17f1',
    author: 'James Bond',
    __v: 0,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${loginResponse.body.token}`)
    .send(newBlog)
    .expect(400);
});

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const user = {
      username: initialUsers[0].username,
      password: initialUsers[0].password,
    };

    const loginResponse = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const newBlog = {
      title: 'HTML is easy',
      author: 'James Bond',
      url: 'http://www.mycoolblog.com',
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginResponse.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set('Authorization', `bearer ${loginResponse.body.token}`)
      .expect(204);

    const blogs = await helpers.blogsInDb();
    expect(blogs.length).toEqual(helpers.initialBlogPosts.length);
    const ids = blogs.map((blog) => blog.id);
    expect(ids).not.toContain(response.body.id);
  });

  test('fails with status code 404 if id is not valid', async () => {
    const user = {
      username: initialUsers[0].username,
      password: initialUsers[0].password,
    };

    const loginResponse = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .delete('/api/blogs/invalid_id')
      .set('Authorization', `bearer ${loginResponse.body.token}`)
      .expect(404);
  });

  test('fails with status code 400 if incorrect token sent', async () => {
    await api
      .delete('/api/blogs/5a422bc61b54a676234d17fc')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjVmMGU3MDZiZThlNjcxMGFmZDIxMjlmOSIsImlhdCI6MTU5NDc4NTY2N30.FXn2BhnxHpZ8ABMqwWIIu5pxl-7UK3z8YJEd6EVozLY')
      .expect(400);
  });

  test('fails with status code 401 if no token sent', async () => {
    await api.delete('/api/blogs/5a422bc61b54a676234d17fc').expect(401);
  });
});

describe('update of a note', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogToUpdate = helpers.initialBlogPosts[0];
    const updatedTitle = 'React patterns v2';
    const updatedContent = { title: updatedTitle };
    let response = await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send(updatedContent)
      .expect(200);
    expect(response.body.title).toEqual(updatedTitle);
    const invalidProperty = { invalid: 'this is an invalid property' };
    response = await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send(invalidProperty)
      .expect(200);
  });

  test('fails with status code 404 if id is invalid', async () => {
    await api.put('/api/blogs/invalid_id').send({ title: 'new title' }).expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
