/* eslint-disable import/no-anonymous-default-export */
import request from '../request';

const signIn = (payload) => request.post('login', payload);

export default {
    signIn,
};