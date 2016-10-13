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

const login = ( send ) => {
	return (dispatch) => {
		axios.post( 'http://localhost:3000/login', send )
			.then(( data ) => {
				dispatch({
					type: data.data.success ? 'LOGIN' : 'NO_LOGIN',
					payload: data.data
				})
			})
			.catch(( error ) => {
				dispatch({ type: 'ERROR_LOGIN', error })
			})
	}
}

const signup = ( send ) => {
	return (dispatch) => {
		axios.post( 'http://localhost:3000/signup', send )
			.then(( data ) => {
				dispatch({
					type: data.data.success ? 'LOGIN' : 'NO_LOGIN',
					payload: data.data
				})
			})
			.catch(( error ) => {
				dispatch({ type: 'ERROR_SIGNUP', error })
			})
	}
}

const logout = ( user ) => {
	return (dispatch) => {
		dispatch({
			type: 'LOGOUT',
			payload: user
		})
	}
}

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

export {
	login,
	signup,
	logout,
	showCities, 
	fetchCountries, 
	showCountries,
	selectCountry, 
	showCountriesCities,
	selectCity,
	addNewCountryOrCity,
	updateCities,
	removeCountryOrCity,
}