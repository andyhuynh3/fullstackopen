import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';

const Recommended = ({ show }) => {
  const [loadBooks, booksResult] = useLazyQuery(
    ALL_BOOKS,
  );
  const [loadMe, meResult] = useLazyQuery(
    ME,
  );

  useEffect(() => {
    loadMe();
  }, []);

  useEffect(() => {
    if (meResult.called && !meResult.loading) {
      console.log(meResult);
      loadBooks({ variables: { genre: meResult.data.me.favoriteGenre } });
    }
  }, [meResult]);

  if (show) {
    if (meResult.called && meResult.loading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <h2>recommendations</h2>
        books in your favorite genre
        {' '}
        <b>{meResult.data.favoriteGenre}</b>
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
            {booksResult.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <></>;
};

export default Recommended;
