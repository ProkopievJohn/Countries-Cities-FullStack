import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import middlewere from './middleweres/middlewere'
import reducer from './reducers';

let createStoreWithMiddlewere = applyMiddleware(middlewere, logger())(createStore);

const store = createStoreWithMiddlewere(reducer, {
	data: [],
	displayCountries: [],
	displayCities: []
})

export default store;