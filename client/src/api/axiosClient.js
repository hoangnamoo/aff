import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
console.log(baseURL);
const axiosClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: 'Bearer ' + token,
        };
    }
    return config;
});

export default axiosClient;
