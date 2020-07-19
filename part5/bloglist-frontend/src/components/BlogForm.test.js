import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('<BlogForm />form calls event handler with right details when blog created', () => {
  const mockAddBlogBase = jest.fn();
  const { container, getByLabelText } = render(
    <BlogForm addBlogBase={mockAddBlogBase} />,
  );
  const title = getByLabelText(/title/i);
  const author = getByLabelText(/author/i);
  const url = getByLabelText(/url/i);
  fireEvent.change(title, {
    target: { value: 'My first blog' },
  });
  fireEvent.change(author, {
    target: { value: 'James Bond' },
  });
  fireEvent.change(url, {
    target: { value: 'www.myblog.com' },
  });

  const form = container.querySelector('form');
  fireEvent.submit(form);

  expect(mockAddBlogBase.mock.calls).toHaveLength(1);
  expect(mockAddBlogBase.mock.calls[0][0]).toEqual({
    title: 'My first blog',
    author: 'James Bond',
    url: 'www.myblog.com',
  });
});
