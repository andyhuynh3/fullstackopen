const listHelper = require('../utils/list_helper');
const helpers = require('./test_helpers');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const blogs = helpers.initialBlogPosts;

const noBlogs = [];

test('dummy returns one', () => {
  // eslint-disable-next-line no-shadow
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has many blogs equal the likes of that', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });

  test('when list is empty equal to 0', () => {
    const result = listHelper.totalLikes(noBlogs);
    expect(result).toBe(0);
  });
});

describe('favorite blog', () => {
  test('when list only has one blog it is the favorite', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('when list has many blogs equal the one with most likes', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });

  test('when list has no blogs equal empty object', () => {
    const result = listHelper.favoriteBlog(noBlogs);
    expect(result).toEqual({});
  });
});

describe('most blogs', () => {
  test('when list only has one blog equals the author of that blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 });
  });

  test('when list has more than one blog equals the author with the most blogs', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });

  test('when list has no blogs equals empty object', () => {
    const result = listHelper.mostBlogs(noBlogs);
    expect(result).toEqual({});
  });
});

describe('most likes', () => {
  test('when list only has one blog equals the author of that blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 });
  });

  test('when list has more than one blog equals the author with the most blogs', () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });

  test('when list has no blogs equals empty object', () => {
    const result = listHelper.mostLikes(noBlogs);
    expect(result).toEqual({});
  });
});
