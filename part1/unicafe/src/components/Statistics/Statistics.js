import React from 'react';
import Statistic from '../Statistic/Statistic';

const Statistics = ({ good, neutral, bad }) => {
	const all = good + neutral + bad;
	const feedbackGathered = all !== 0;
	const average = (good - bad) / all;
	const positive = 100 * (good / all);
	const positiveDisplay = `${positive} %`;
	if (feedbackGathered) {
		return (
			<table>
				<tbody>
					<Statistic text='good' value={good} />
					<Statistic text='neutral' value={neutral} />
					<Statistic text='bad' value={bad} />
					<Statistic text='average' value={average} />
					<Statistic text='positive' value={positiveDisplay} />
				</tbody>
			</table>
		);
	}
	return <div>No feedback given</div>;
};

export default Statistics;
