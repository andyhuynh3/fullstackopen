import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification, unsetNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleVote = (anecdote) => () => {
    dispatch(vote(anecdote.id));
    const message = `you voted '${anecdote.content}'`;
    dispatch(setNotification(message));
    setTimeout(() => dispatch(unsetNotification()), 5000);
  };

  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has
        {' '}
        {anecdote.votes}
        <button type="submit" onClick={handleVote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    let anecdotesToRender = anecdotes;
    if (filter !== '') {
      anecdotesToRender = anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()));
    }
    return anecdotesToRender.sort((a, b) => b.votes - a.votes);
  });

  return (
    <div>
      {anecdotes.map((anecdote) => <Anecdote anecdote={anecdote} />)}
    </div>
  );
};

export default AnecdoteList;
