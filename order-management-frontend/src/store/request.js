/* eslint-disable no-param-reassign */
import axios from 'axios';
import constant from '../constant/config';

const request = axios.create();

request.interceptors.request.use(
    (config) => {
        config.baseURL = `${constant.apiUrl}`;
        if (localStorage.getItem('token')) {
            config.headers = {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json',
            };
        }
        return config;
    },
    (error) => Promise.reject(error),
);

request.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            return Promise.reject(error.response.data);
        }
        if (error.request) {
            return Promise.reject(error.request);
        }
        return Promise.reject(error);
    },
);

export default request;
