import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = ({ show }) => {
  const { loading, data } = useQuery(ALL_BOOKS);

  if (show) {
    if (loading) {
      return null;
    }
    return (
      <div>
        <h2>books</h2>

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
            {data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
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

export default Books;
