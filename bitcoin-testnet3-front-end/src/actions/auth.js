import axios from 'axios';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function singupUser(userObj) {
  return axios.post('/api/users', userObj).then(user => ({
    type: SET_CURRENT_USER,
    user
  }));
}
