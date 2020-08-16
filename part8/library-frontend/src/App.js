import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommended from './components/Recommended';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);

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
