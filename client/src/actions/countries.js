import axios from 'axios';

export const fetch = () => {
	return (dispatch) => {
		axios.get('http://localhost:3000/countries')
			.then((data) => {
				const action = {
					type: 'FETCH_COUNTRIES',
					payload: data.data
				}
				
				dispatch(action)
			})
			.catch(( error ) => {
				const action = {
					type: 'ERROR_FETCH_COUNTRIES',
					error
				}

				dispatch(action)
			})
	}
};

export const show = (arrCountries) => {
	const action = {
		type: 'SHOW_COUNTRIES',
		payload: arrCountries
	}

	return (dispatch) => {
		dispatch(action)
	}
}

export const select = (nameCountry) => {
	const action = {
		type: 'SELECT_COUNTRY',
		payload: nameCountry
	}

	return (dispatch) => {
		dispatch(action)
	}
}
