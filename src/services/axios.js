import axios from 'axios';

const AUTH_TOKEN = localStorage.getItem('token');

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN ? 'Bearer ' + AUTH_TOKEN : '';

export default axios;