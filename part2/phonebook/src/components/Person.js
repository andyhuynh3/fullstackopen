import React from 'react';

const Person = ({ person, handleDelete }) => {
	return (
		<p key={person['id']}>
			{person['name']} {person['phone']}{' '}
			<button onClick={() => handleDelete(person)}>delete</button>
		</p>
	);
};

export default Person;
