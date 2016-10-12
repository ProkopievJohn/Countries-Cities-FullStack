import axios from 'axios';

const fetchCountries = () => {
	return (dispatch) => {
		axios.get('http://localhost:3000/countries')
			.then((data) => {
				dispatch({
					type: 'FETCH_COUNTRIES',
					payload: data.data
				})
			})
			.catch(( error ) => {
				dispatch({ type:'ERROR_FETCH_COUNTRIES', error });
			})
	}
};

const showCountries = (arrCountries) => {
	return (dispatch) => {
		dispatch({
			type: 'SHOW_COUNTRIES',
			payload: arrCountries
		})
	}
}

const selectCountry = (nameCountry) => {
	return (dispatch) => {
		dispatch({
			type: 'SELECT_COUNTRY',
			payload: nameCountry
		})
	}
}

const showCities = (arrCities) => {
	return (dispatch) => {
		dispatch({
			type: 'SHOW_CITIES',
			payload: arrCities
		})
	}
}

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

export {
	showCities, 
	fetchCountries, 
	showCountries,
	selectCountry, 
	showCountriesCities,
	selectCity
}