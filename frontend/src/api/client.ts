import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
    // Add authentication token to headers
    const token = useAuthStore.getState().access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
