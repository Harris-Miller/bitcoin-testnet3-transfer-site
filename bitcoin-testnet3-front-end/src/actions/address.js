import api from '../utils/api';

export const ADD_ADDRESSES = 'ADD_ADDRESS';
export const SET_ADDRESSES = 'SET_ADDRESSES';
export const CLEAR_ADDRESSES = 'CLEAR_ADDRESSES';
export const REMOVE_ADDRESS = 'REMOVE_ADDRESS';
export const SET_TRANSACTION = 'SET_TRANSACTION';

export function addAddress(userId, address) {
  return api.post(`/api/users/${userId}/addresses`, { key: address }).then(({ data }) => data);
}

export function getAddresses(userId) {
  return api.get(`/api/users/${userId}/addresses`).then(({ data }) => ({
    type: SET_ADDRESSES,
    data
  }));
}

export function clearAddresses() {
  return {
    type: CLEAR_ADDRESSES
  };
}

export function removeAddress(userId, address) {
  return api.delete(`/api/users/${userId}/addresses/${address}`);
}

export function setTransaction(data) {
  return {
    type: SET_TRANSACTION,
    data
  };
}