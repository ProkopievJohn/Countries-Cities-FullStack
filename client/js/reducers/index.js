import { combineReducers } from 'redux'
import countries from './countries';
import cities from './cities';
import countriesData from './countriesData';
import listDisplayCountries from './listDisplayCountries'

export default combineReducers({
  countriesData,
  listDisplayCountries
})