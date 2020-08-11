import React, { useState } from 'react';
import {
  useQuery, useMutation,
} from '@apollo/client';
import Select from 'react-select';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = ({ show }) => {
  const { loading, data } = useQuery(ALL_AUTHORS);
  const [born, setBorn] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    editAuthor({
      variables: {
        name: selectedOption.value, setBornTo: Number(born),
      },
    });
  };

  console.log(selectedOption);

  if (show) {
    if (loading) {
      return null;
    }
    const options = data.allAuthors.map((author) => ({ value: author.name, label: author.name }));
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th />
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={handleSubmit}>
            <div>
              name
              {' '}
              <Select options={options} onChange={(option) => setSelectedOption(option)} />
            </div>
            <div>
              born
              {' '}
              <input type="text" id="name" onChange={({ target }) => setBorn(target.value)} />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      </div>
    );
  }
  return <></>;
};

export default Authors;
