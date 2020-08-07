import axios from 'axios';

const baseUrl = '/api/comments';

const create = async (comment) => {
  const request = await axios.post(baseUrl, comment);
  return request.data;
};

export default { create };
