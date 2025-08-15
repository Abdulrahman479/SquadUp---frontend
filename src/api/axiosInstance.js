import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://squad-up-backend.vercel.app/api', // adjust if your backend URL is different
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
