import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const add = (person) => {
	const request = axios.post(baseUrl, person);
	return request.then((response) => response.data);
};

const del = (id) => {
	return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, person) => {
	const request = axios.put(`${baseUrl}/${id}`, person);
	return request.then((response) => response.data);
};

export default { getAll, add, del, update };
