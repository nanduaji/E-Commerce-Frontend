import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
    // baseURL: 'https://nodejs-backend-tutorials.onrender.com/api',
    timeout: 1000,
});



export default axiosInstance;