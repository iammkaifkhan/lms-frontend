import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://lms-backend-0a9e.onrender.com/api/v1",
    withCredentials: true,
});

export default axiosInstance;