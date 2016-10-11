import { combineReducers } from 'redux'
import enterCountry from './enterCountry';
import enterCity from './enterCity';
import showCountries from './showCountries'
import fetchCountries from './fetchCountries'

export default combineReducers({
	showCountries,
	fetchCountries,
	enterCountry,
	enterCity
})