import axios from 'axios';
import setAuthorizationToken from '../utils/set-authorization-token';
import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

export function removeCurrentUser() {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken();
  return {
    type: REMOVE_CURRENT_USER
  };
}

export function setCurrentUser(token) {
  localStorage.setItem('jwtToken', token);
  setAuthorizationToken(token);

  const user = jwtDecode(token);

  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function login(data) {
  return axios.post('http://localhost:3000/api/auth', data).then(res => res.data.token);
}

export function singupUser(userObj) {
  return axios.post('http://localhost:3000/api/users', userObj).then(res => res.data);
}
