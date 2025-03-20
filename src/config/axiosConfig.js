import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://e-commerce-backend-1-njlm.onrender.com/api',
    timeout: 10000,
});



export default axiosInstance;