import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { Accept: 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const imageUrl = (path) =>
  path ? `${API_URL}/storage/${path.replace(/\\/g, '/')}` : null;

export default api;
export const getError = (err) => {
  const d = err.response?.data;
  if (d?.data && typeof d.data === 'object') {
    return Object.values(d.data).flat().join(' ');
  }
  return d?.message || 'حصلت مشكلة، حاول تاني.';
};