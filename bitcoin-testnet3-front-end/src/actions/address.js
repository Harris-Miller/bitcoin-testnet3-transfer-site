import axios from 'axios';

const apiHost = process.env.REACT_APP_API_HOST;

export const ADD_ADDRESS = 'ADD_ADDRESS';
export const RESET_ADDRESSES = 'RESET_ADDRESSES';

export function addAddress(address) {

}

export function getAddresses(userId) {
  return axios.get(`${apiHost}/api/users/${userId}/addresses`).then(res => ({
    type: RESET_ADDRESSES,
    data: res.data
  }));
}
