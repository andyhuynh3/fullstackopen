import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
	const totalExercises = parts.reduce((acc, cur) => {
		return acc + cur['exercises'];
	}, 0);
	return (
		<>
			{parts.map((part) => (
				<Part part={part} key={part['id']}/>
			))}
			<b>total of {totalExercises} exercises</b>
		</>
	);
};

export default Content;
