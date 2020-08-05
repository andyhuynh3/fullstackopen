import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    username: 'user_one',
  };
  const mockHandleLike = jest.fn();
  const mockRemoveButton = jest.fn();

  let component;

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        handleLike={mockHandleLike}
        removeButton={mockRemoveButton}
      />,
    );
  });

  test('by default, only blog title and author is displayed', () => {
    const div = component.container.querySelector('.hidden');

    expect(div).toHaveTextContent(
      'Go To Statement Considered Harmful Edsger W. Dijkstra',
    );
    expect(div).not.toHaveTextContent(
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    );
    expect(div).not.toHaveTextContent(
      '5',
    );
    expect(div).not.toHaveStyle('display: none');
  });

  test('url and number of likes are shown after view button is clicked', () => {
    const div = component.container.querySelector('.show');
    expect(div).toHaveStyle('display: none');
    const button = component.getByText('view');
    fireEvent.click(button);
    expect(div).not.toHaveStyle('display: none');
    expect(div).toHaveTextContent('Go To Statement Considered Harmful Edsger W. Dijkstra');
    expect(div).toHaveTextContent(
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    );
    expect(div).toHaveTextContent(
      '5',
    );
  });

  test('event handle invoked twice when like button clicked twice', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandleLike.mock.calls).toHaveLength(2);
  });
});
