import { combineReducers } from 'redux'
import showCities from './showCities';
import showCountries from './showCountries'
import fetchCountries from './fetchCountries'
import selectCity from './selectCity'
import selectCountry from './selectCountry'
import showCountriesCities from './showCountriesCities'

export default combineReducers({
	showCountries,
	fetchCountries,
	showCities,
	selectCity,
	selectCountry,
	showCountriesCities
})