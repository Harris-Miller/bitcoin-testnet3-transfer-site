import axios from 'axios';
import setAuthorizationToken from '../utils/set-authorization-token';
import jwt from 'jsonwebtoken';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function login(data) {
  return axios.post('http://localhost:3000/api/auth', data).then(res => {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    return setCurrentUser(jwt.decode(token));
  });
}

export function singupUser(userObj) {
  return axios.post('/api/users', userObj).then(user => setCurrentUser(user));
}
