import axios from 'axios';
import { clearAuthAndRedirect } from './authUtils';

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    clearAuthAndRedirect();
  }
  return Promise.reject(error);
});

export default axiosInstance;