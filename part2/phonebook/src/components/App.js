import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import Persons from './Persons';
import PersonForm from './PersonForm';
import axios from 'axios';

const App = () => {
	const [persons, setPersons] = useState([]);
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

	const hook = () => {
		axios.get('http://localhost:3001/persons').then((response) => {
			setPersons(response.data);
		});
	};

	useEffect(hook, []);

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
