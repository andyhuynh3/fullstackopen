import React, { useState, useEffect } from 'react';
import {
  useApolloClient,
} from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommended from './components/Recommended';
import { ALL_BOOKS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const token = window.localStorage.getItem('library-user-token');
    if (token) {
      setToken(token);
    }
  }, []);

  const handleLogout = () => {
    setToken(null);
    window.localStorage.removeItem('library-user-token');
  };

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map((b) => b.id).includes(object.id);
    const dataInStore = client.readQuery({ query: ALL_BOOKS, variables: { genre: null } });
    console.log(dataInStore.allBooks);
    console.log(addedBook);
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      console.log('in here');
      client.writeQuery({
        query: ALL_BOOKS,
        data: { ...dataInStore, allBooks: [...dataInStore.allBooks, addedBook] },
        variables: { genre: null },
      });
    }
  };

  const authDisplay = () => {
    if (token) {
      return (
        <>
          {' '}
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommended')}>recommended</button>
          <button onClick={() => handleLogout()}>logout</button>
        </>
      );
    }
    return <button onClick={() => setPage('login')}>login</button>;
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {authDisplay()}
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <Recommended
        show={page === 'recommended'}
      />

    </div>
  );
};

export default App;
