import anecdoteService from '../services/anecdote';

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': return action.updatedAnecdotes;
    case 'NEW_ANECDOTE': {
      return [...state, action.newAnecdote];
    }
    case 'INITIALIZE_ANECDOTES': return action.anecdotes;
    default:
      return state;
  }
};

export const vote = (id) => async (dispatch, getState) => {
  const { anecdotes } = getState();
  console.log(anecdotes);
  const anecdoteToUpdate = anecdotes.find((a) => a.id === id);
  console.log(anecdoteToUpdate);
  const updatedAnecdote = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 };
  const updatedAnecdotes = anecdotes.map((anecdote) => (anecdote.id === id ? updatedAnecdote : anecdote));
  await anecdoteService.updateAnecdote(id, updatedAnecdote);
  dispatch({
    type: 'VOTE',
    updatedAnecdotes,
  });
};

export const createAnecdote = (anecdote) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createAnecdote(anecdote);
  dispatch({
    type: 'NEW_ANECDOTE',
    newAnecdote,
  });
};

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  return dispatch({
    type: 'INITIALIZE_ANECDOTES',
    anecdotes,
  });
};

export default anecdoteReducer;
