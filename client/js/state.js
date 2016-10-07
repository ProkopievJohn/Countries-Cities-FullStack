import {createStore, combineReducers, applyMiddleware} from 'redux'
import promisesMiddlewere from './middleweres/promises'
import * as reducers from './reducers'

const reduser = combineReducers(reducers);

let createStoreWithMiddlewere = applyMiddleware(promisesMiddlewere)(createStore);

const store = createStoreWithMiddlewere(reduser, {
	// user: {},
	cities: { cities: ['no cities'] },
	countries: { countries: ['no countries'] },
})

export default store;