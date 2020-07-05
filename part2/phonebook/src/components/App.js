import React, { useState } from 'react';
import Filter from './Filter';
import Persons from './Persons';
import PersonForm from './PersonForm';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleAdd = (event) => {
		event.preventDefault();
		if (persons.map((person) => person.name).includes(newName)) {
			alert(`${newName} is already added to phonebook`);
			return;
		}
		setPersons([...persons, { name: newName, phone: newNumber }]);
		setNewName('');
		setNewNumber('');
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilter = (event) => {
		setFilter(event.target.value.toLowerCase());
	};

	const personsToDisplay =
		filter === ''
			? persons
			: persons.filter((person) => person.name.toLowerCase().includes(filter));

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter handleFilter={handleFilter} filter={filter} />
			<h3>add a new</h3>
			<PersonForm
				handleNameChange={handleNameChange}
				name={newName}
				handleNumberChange={handleNumberChange}
				number={newNumber}
				handleAdd={handleAdd}
			/>
			<h3>Numbers</h3>
			<Persons persons={personsToDisplay} />
		</div>
	);
};

export default App;
