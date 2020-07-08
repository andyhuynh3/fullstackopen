import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import Persons from './Persons';
import PersonForm from './PersonForm';
import personService from '../services/person';
import Alert from './Alert';
import '../index.css';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');
	const [alert, setAlert] = useState(null);

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleAdd = (event) => {
		event.preventDefault();
		const existingPerson = persons.find((person) => person.name === newName);
		if (existingPerson) {
			handleUpdate(existingPerson);
			return;
		}
		const newPerson = { name: newName, phone: newNumber };
		personService.add(newPerson).then((returnedPerson) => {
			setPersons([...persons, returnedPerson]);
			setNewName('');
			setNewNumber('');
		});
		setAlert({ message: `Added ${newName}`, className: 'success' });
		setTimeout(() => {
			setAlert(null);
		}, 3000);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilter = (event) => {
		setFilter(event.target.value.toLowerCase());
	};

	const hook = () => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	};

	useEffect(hook, []);

	const handleDelete = (personToDelete) => {
		window.confirm(`Delete ${personToDelete.name} ?`);
		personService.del(personToDelete.id).catch((error) => {
			setAlert({
				message: `Information of ${personToDelete.name} has already been removed from server`,
				className: 'error'
			});
			setTimeout(() => {
				setAlert(null);
			}, 3000);
		});
		const newPersonsToDisplay = [];
		for (let person of persons) {
			if (person.id !== personToDelete.id) {
				newPersonsToDisplay.push(person);
			}
		}
		setPersons(newPersonsToDisplay);
	};

	const handleUpdate = (personToUpdate) => {
		window.confirm(
			`${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`
		);
		const updatedPerson = { ...personToUpdate, phone: newNumber };
		personService
			.update(personToUpdate.id, updatedPerson)
			.then((returnedPerson) => {
				console.log('Updated person...');
				setPersons(
					persons.map((person) =>
						person.id !== personToUpdate.id ? person : returnedPerson
					)
				);
			});
	};

	const personsToDisplay =
		filter === ''
			? persons
			: persons.filter((person) => person.name.toLowerCase().includes(filter));

	return (
		<div>
			<h2>Phonebook</h2>
			<Alert alert={alert} />
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
			<Persons persons={personsToDisplay} handleDelete={handleDelete} />
		</div>
	);
};

export default App;
