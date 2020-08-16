import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = ({ show }) => {
  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: { genre: null },
  });
  const [genre, setGenre] = useState('all genres');

  if (show) {
    if (loading) {
      return null;
    }
    const books = data.allBooks;
    const allGenres = books.reduce((acc, cur) => [...cur.genres, ...acc], []);
    const uniqueGenres = [...new Set(allGenres), 'all genres'];
    const booksToDisplay = genre !== 'all genres'
      ? books.filter((book) => book.genres.includes(genre))
      : books;

    return (
      <div>
        <h2>books</h2>
        in genre
        {' '}
        <b>{genre}</b>
        <table>
          <tbody>
            <tr>
              <th />
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {booksToDisplay.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {uniqueGenres.map((genre) => <button onClick={() => setGenre(genre)}>{genre}</button>)}
      </div>
    );
  }
  return <></>;
};

export default Books;
