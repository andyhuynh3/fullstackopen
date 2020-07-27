import React from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleVote = (anecdote) => () => {
    dispatch(vote(anecdote.id));
    const message = `you voted '${anecdote.content}'`;
    dispatch(setNotification(message));
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

const AnecdoteList = ({ anecdotes }) => (
  <div>
    {anecdotes.map((anecdote) => <Anecdote key={anecdote.id} anecdote={anecdote} />)}
  </div>
);
const mapStateToProps = (state) => {
  let anecdotes;
  if (state.filter !== '') {
    anecdotes = state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()));
  } else {
    anecdotes = state.anecdotes;
  }
  return {
    anecdotes: anecdotes.sort((a, b) => b.votes - a.votes),
  };
};

const ConnectedAnecdoteList = connect(mapStateToProps, null)(AnecdoteList);

export default ConnectedAnecdoteList;
