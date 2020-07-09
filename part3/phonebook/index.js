const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());

morgan.token('body', (request) => {
	return JSON.stringify(request.body);
});

app.use(morgan(':method :url :response-time :body'));

let persons = [
	{
		name: 'Arto Hellas',
		number: '040-123456',
		id: 1
	},
	{
		name: 'Ada Lovelac',
		number: '39-44-532532',
		id: 2
	},
	{
		name: 'Dan Abramov',
		number: '12-43-234345',
		id: 3
	},
	{
		name: 'Mark Poppendieck',
		number: '39-23-6423122',
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
	if (!body.name || !body.number) {
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
		number: body.number,
		id: Math.floor(Math.random() * 10000000)
	};

	persons = persons.concat(person);
	response.json(person);
});

const PORT = 3002;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
