import axios from 'axios';



const showCountriesCities = (arrCities) => {
	return (dispatch) => {
		dispatch({
			type: 'SHOW_COUNTRIES_CITIES',
			payload: arrCities
		})
	}
}

const selectCity = (nameCity) => {
	return (dispatch) => {
		dispatch({
			type: 'SELECT_CITY',
			payload: nameCity
		})
	}
}

const addNewCountryOrCity = (data) => {
	return (dispatch) => {
		axios({
			method: 'post',
			url: 'http://localhost:3000/countries',
			data: data.cities === undefined
					? { id: data.id }
					: { id: data.id, cities: data.cities },
			headers: { 'Authorization': data.token }
		})
			.then((data) => {
				dispatch({
					type: 'FETCH_COUNTRIES',
					payload: data.data
				})
			})
			.catch(( error ) => {
				dispatch({ type: 'ERROR_NEW_COUNTRIES', error })
			})
	}
}

const updateCities = (data) => {
	return (dispatch) => {
		axios({
			method: 'put',
			url: 'http://localhost:3000/countries',
			data: {
				id: data.id,
				cities: data.cities
			},
			headers: { 'Authorization': data.token }
		})
			.then((data) => {
				dispatch({
					type: 'FETCH_COUNTRIES',
					payload: data.data
				})
			})
			.catch(( error ) => {
				dispatch({ type: 'ERROR_UPDATE_CITIES', error })
			})
	}
}

const removeCountryOrCity = (data) => {
	return (dispatch) => {
		axios({
			method: 'delete',
			url: 'http://localhost:3000/countries',
			data: data.cities === undefined
					? { id: data.id }
					: { id: data.id, cities: data.cities },
			headers: { 'Authorization': data.token }
		})
			.then((data) => {
				dispatch({
					type: 'FETCH_COUNTRIES',
					payload: data.data
				})
			})
			.catch(( error ) => {
				dispatch({ type: 'ERROR_REMOVE_COUNTRIES', error })
			})
	}
}

// import { fetchCountries, showCountries, selectCountry } from './countries'
import * as countries from './countries';
import * as cities from './cities';
import * as user from './user';

export {
	countries,
	cities,
	user,

	showCities,
	showCountriesCities,
	selectCity,
	addNewCountryOrCity,
	updateCities,
	removeCountryOrCity,
}