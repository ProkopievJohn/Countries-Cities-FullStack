import axios from 'axios';

export const fetch = () => {
	return (dispatch) => {
		dispatch({
			type: 'START_FETCH_COUNTRIES'
		})
		axios.get('http://localhost:3000/countries')
			.then((data) => {
				const fetchCountries = (data) => {
					return {
						type: 'FETCH_COUNTRIES',
						payload: data
					}
				}
				
				dispatch(fetchCountries(data.data))
			})
			.catch(( error ) => {
				const errorFetvhCountries = (error) => {
					return {
						type: 'ERROR_FETCH_COUNTRIES',
						error
					}
				}

				dispatch(errorFetvhCountries(error))
			})
	}
};

export const show = (arrCountries) => {
	const showCountries = (data) => {
		return {
			type: 'SHOW_COUNTRIES',
			payload: data
		}
	}

	return (dispatch) => {
		dispatch(showCountries(arrCountries))
	}
}

export const select = (nameCountry) => {
	const selectCountry = ( data ) => {
		return {
			type: 'SELECT_COUNTRY',
			payload: data,
		}
	}

	return (dispatch) => {
		dispatch(selectCountry(nameCountry))
	}
}
