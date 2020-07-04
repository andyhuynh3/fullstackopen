import React, { useState } from 'react';

import Button from '../Button/Button';
import Statistics from '../Statistics/Statistics';

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const incrementGood = () => setGood(good + 1);
	const incrementNeutral = () => setNeutral(neutral + 1);
	const incrementBad = () => setBad(bad + 1);

	return (
		<div>
			<h1>give feedback</h1>
			<div style={{ display: 'flex' }}>
				<Button text='good' handleClick={incrementGood} />
				<Button text='neutral' handleClick={incrementNeutral} />
				<Button text='bad' handleClick={incrementBad} />
			</div>
			<h1>statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
