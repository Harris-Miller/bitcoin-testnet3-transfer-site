import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers';

export default createStore(
  reducers,
  applyMiddleware(
    promiseMiddleware
  )
);
