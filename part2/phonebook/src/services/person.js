import axios from 'axios';

const getAll = () => {
	const request = axios.get('http://localhost:3001/persons');
	return request.then((response) => response.data);
};

const add = (person) => {
	const request = axios.post('http://localhost:3001/persons', person);
	return request.then((response) => response.data);
};

const del = (id) => {
	return axios.delete(`http://localhost:3001/persons/${id}`);
};

const update = (id, person) => {
	const request = axios.put(`http://localhost:3001/persons/${id}`, person);
	return request.then((response) => response.data);
};

export default { getAll, add, del, update };
