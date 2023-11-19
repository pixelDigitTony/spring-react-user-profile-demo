// api.js
import axios from 'axios';

const API = axios.create({
    baseURL: '/api', // Replace with your API URL
    timeout: 10000, // You can adjust the timeout if needed
    headers: {
        'Content-Type': 'application/json',
    },
});

export default API;