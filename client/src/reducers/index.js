import { combineReducers } from 'redux'
import showCities from './showCities';
import selectCity from './selectCity'
import selectCountry from './selectCountry'
import showCountriesCities from './showCountriesCities'
import login from './login'

import * as countries from './countries'

export default combineReducers(countries)

// export default combineReducers({
// 	countries: countries,
// 	// countries,
// 	login,
// 	showCountries,
// 	// fetchCountries,
// 	showCities,
// 	selectCity,
// 	selectCountry,
// 	showCountriesCities,
// })