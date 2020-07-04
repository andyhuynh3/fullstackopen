import React, { useState } from 'react';

const App = ({ anecdotes }) => {
	const [selected, setSelected] = useState(0);
	const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

	const getRandomInt = () => {
		return Math.floor(Math.random() * anecdotes.length);
	};

	const handleNextAnecdote = () => setSelected(getRandomInt());
	const handleVote = () => {
		const copy = [...points];
		copy[selected] += 1;
		setPoints(copy);
	};
	return (
		<div>
			<h1>Anecdote of the day</h1>
			{anecdotes[selected]}
			<div>has {points[selected]} votes</div>
			<div>
				<button onClick={handleVote}>vote</button>
				<button onClick={handleNextAnecdote}>next anecdote</button>
			</div>
			<h1>Anecdote with most votes</h1>
			{anecdotes[points.indexOf(Math.max(...points))]}
		</div>
	);
};

export default App;
