import axios from 'axios';

const apiHost = process.env.REACT_APP_API_HOST;

export const ADD_ADDRESS = 'ADD_ADDRESS';
export const SET_ADDRESSES = 'SET_ADDRESSES';
export const CLEAR_ADDRESSES = 'CLEAR_ADDRESSES';
export const SET_TRANSACTION = 'SET_TRANSACTION';

export function addAddress(address) {

}

export function getAddresses(userId) {
  return axios.get(`${apiHost}/api/users/${userId}/addresses`).then(({ data }) => ({
    type: SET_ADDRESSES,
    data
  }));
}

export function clearAddresses() {
  return {
    type: CLEAR_ADDRESSES
  };
}

export function setTransaction(data) {
  return {
    type: SET_TRANSACTION,
    data
  };
}