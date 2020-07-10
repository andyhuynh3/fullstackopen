require('dotenv').config();
const mongoose = require('mongoose');

url = process.env.MONGODB_URI;

mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.log(`Error connecting to MongoDB: ${error.message}`);
	});

const personSchema = new mongoose.Schema({
	name: String,
	phone: String
});

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
