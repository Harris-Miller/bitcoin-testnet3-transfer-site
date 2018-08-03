import axios from 'axios';

export const SET_BPI = 'SET_BPI';

export function fetchBpiCurrentUsd() {
  return axios.get('https://api.coindesk.com/v1/bpi/currentprice/usd.json').then(({ data }) => data);
}

export function setBpi(data) {
  return {
    type: SET_BPI,
    data
  };
}
