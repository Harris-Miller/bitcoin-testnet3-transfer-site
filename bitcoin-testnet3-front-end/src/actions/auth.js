import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils/set-authorization-token';
import api from '../utils/api';

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
  };
}

export function login(data) {
  return api.post('/api/auth', data).then(res => res.data.token);
}

export function singupUser(userObj) {
  return api.post('/api/users', userObj).then(res => res.data);
}
