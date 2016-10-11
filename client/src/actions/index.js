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

const enterCountry = (nameCountry) => {
	return (dispatch) => {
		dispatch({
			type: 'ENTER_COUNTRY',
			payload: nameCountry
		})
	}
}


const enterCity = (nameCity) => {
	return (dispatch) => {
		dispatch({
			type: 'ENTER_CITY',
			payload: nameCity
		})
	}
}

export { enterCity }
export { fetchCountries }
export { showCountries }
export { enterCountry }