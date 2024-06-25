import axios from 'axios';
import { getEnvironmentVariable } from './envService';

function getApiUrl() {
  return getEnvironmentVariable('VITE_BACKEND_API');
}

function createAxiosInstance() {
  const apiUrl = getApiUrl();
  return axios.create({
    baseURL: apiUrl,
  });
}

const api = createAxiosInstance();

export default api;
