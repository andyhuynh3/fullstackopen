require('dotenv').config();
const mongoose = require('mongoose');

const argvLength = process.argv.length;

const url = process.env.MONGO_DB_URL;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
	name: String,
	phone: String
});

const Person = mongoose.model('Person', personSchema);

if (argvLength === 2) {
	Person.find({}).then((result) => {
		console.log('Person:');
		result.forEach((Person) => {
			console.log(`${Person.name} ${Person.phone}`);
		});
		mongoose.connection.close();
	});
} else {
	if (argvLength < 4) {
		console.log(
			'Please provide both a name and phone number: node mongo.js <password> <name> <phone>'
		);
		process.exit(1);
	}
	const person = new Person({
		name: process.argv[2],
		phone: process.argv[3]
	});
	person.save().then((result) => {
		console.log(`added ${result.name} number ${result.phone} to Person`);
		mongoose.connection.close();
	});
}
