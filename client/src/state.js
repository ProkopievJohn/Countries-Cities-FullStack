import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reducer from './reducers';
import thunk from 'redux-thunk';

let createStoreWithMiddlewere = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddlewere(reducer, {
	fetchCountries: [],
	showCountries: [],
	countriesSearch: ''
})

export default store;
