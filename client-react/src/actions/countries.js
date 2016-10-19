import axios from 'axios';
import { load as loadCities } from './cities';

export const load = () => {
	return ( dispatch ) => {
		dispatch({
			type: 'START_LOADED_COUNTRIES'
		})
		axios.get('http://localhost:3000/countries')
			.then(( data ) => {
				const loaded = ( data ) => {
					return {
						type: 'LOADED_COUNTRIES',
						payload: data
					}
				}
				dispatch( loaded( data.data ) )
				dispatch( show( data.data ) )
			})
			.catch(( error ) => {
				const errorLoadedCountries = ( error ) => {
					return {
						type: 'ERROR_LOADED_COUNTRIES',
						error: error,
					}
				}

				dispatch( errorLoadedCountries( error ) )
			})
	}
};

export const show = ( arrCountries ) => {

	const loadedCitiesFromCountries = ( data ) => {
		let cities = [];
		data.map((item) => {
			for (var i = 0; i < item.cities.length; i++) {
				cities.push({ id: item.id, city: item.cities[i] })
			}
		})
		return cities;
	}
	const arrCities = loadedCitiesFromCountries(arrCountries);
		
	const show = ( data ) => {
		return {
			type: 'SHOW_COUNTRIES',
			payload: data
		}
	}

	return ( dispatch ) => {
		dispatch( show( arrCountries ) )
		dispatch( loadCities( arrCities ) )
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
