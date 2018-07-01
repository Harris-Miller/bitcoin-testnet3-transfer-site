import openSocket from 'socket.io-client';
import store from './store';
import { setTransaction } from './actions/address';

const apiHost = process.env.REACT_APP_API_HOST;
const socket = openSocket(apiHost);

socket.on('transaction', txs => {
  store.dispatch(setTransaction(txs));
});


export default socket;