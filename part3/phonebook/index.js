const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (request) => {
	return JSON.stringify(request.body);
});

app.use(morgan('common'));

let persons = [
	{
		name: 'Arto Hellas',
		phone: '040-123456',
		id: 1
	},
	{
		name: 'Ada Lovelac',
		phone: '39-44-532532',
		id: 2
	},
	{
		name: 'Dan Abramov',
		phone: '12-43-234345',
		id: 3
	},
	{
		name: 'Mark Poppendieck',
		phone: '39-23-6423122',
		id: 4
	}
];

app.get('/api/persons', (request, response) => {
	response.json(persons);
});

app.get('/info', (request, response) => {
	response.send(
		`<div>Phonebook has info for ${
			persons.length
		} people</div><div>${new Date()}</div>`
	);
});

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => person.id === id);
	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((person) => person.id !== id);
	response.status(204).end();
});

app.post('/api/persons', (request, response) => {
	const body = request.body;
	if (!body.name || !body.phone) {
		return response.status(400).json({
			error: 'Must supply name and number to request'
		});
	}

	const existingPerson = persons.find((person) => person.name == body.name);
	if (existingPerson) {
		return response.status(400).json({
			error: `Person ${existingPerson.name} already exists`
		});
	}

	const person = {
		name: body.name,
		phone: body.phone,
		id: Math.floor(Math.random() * 10000000)
	};

	persons = persons.concat(person);
	response.json(person);
});

app.put('/api/persons/:id', (request, response) => {
	const body = request.body;
	const personToUpdateIndex = persons.findIndex(
		(person) => person.name === body.name
	);
	persons[personToUpdateIndex].phone = body.phone;
	const person = persons[personToUpdateIndex];
	response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
