import axios from 'axios';

const host = process.env.REACT_APP_SERVER_HOST;

const apiClient = axios.create({
  baseURL: host,
});

export default apiClient;
