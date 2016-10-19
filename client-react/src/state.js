import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reducers from './reducers';
import thunk from 'redux-thunk';

let createStoreWithMiddlewere = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddlewere(reducers)

export default store;
