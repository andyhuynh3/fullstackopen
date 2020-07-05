import React from 'react';

const Person = ({ person }) => {
	return (
		<p key={person['name']}>
			{person['name']} {person['phone']}
		</p>
	);
};

export default Person;
