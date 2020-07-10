const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (request) => {
	return JSON.stringify(request.body);
});

app.use(morgan('common'));

app.get('/api/persons', (_request, response) => {
	Person.find({}).then((persons) => {
		response.json(persons);
	});
});

app.get('/info', (_request, response) => {
	Person.count({}).then((count) => {
		response.send(
			`<div>Phonebook has info for ${count} people</div><div>${new Date()}</div>`
		);
	});
});

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then((_) => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

app.post('/api/persons', (request, response) => {
	const body = request.body;
	if (!body.name || !body.phone) {
		return response.status(400).json({
			error: 'Must supply name and number to request'
		});
	}

	const person = Person({
		name: body.name,
		phone: body.phone
	});

	person.save().then((savedPerson) => {
		response.json(savedPerson);
	});
});

app.put('/api/persons/:id', (request, response) => {
	const person = {
		phone: request.body.phone
	};
	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then((updatedPerson) => {
			response.json(updatedPerson);
		})
		.catch((error) => next(error));
});

const errorHandler = (error, _request, response, _next) => {
	console.error(error.message);
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	}
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
