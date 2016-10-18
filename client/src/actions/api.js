import axios from 'axios';
import { load } from './countries';

export const addNewCountryOrCity = ( obj ) => {
	return ( dispatch ) => {
        dispatch({
            type: 'START_ADDED_COUNTRY_OR_CITY'
        })
		axios({
			method: 'post',
			url: 'http://localhost:3000/countries',
			data: obj.cities === undefined
					? { id: obj.id }
					: { id: obj.id, cities: obj.cities },
			headers: { 'Authorization': obj.token }
		})
			.then((data) => {
                dispatch( load() );
			})
			.catch(( error ) => {
                const errorAddNewCountry = (error) => {
                    return {
                        type: 'ERROR_ADD_NEW_COUNTRIES',
                        error: error,
                    }
                }
				dispatch( errorAddNewCountry() );
			})
	}
}

export const updateCities = ( obj ) => {
	return ( dispatch ) => {
		axios({
			method: 'put',
			url: 'http://localhost:3000/countries',
			data: {
				id: obj.id,
				cities: obj.cities
			},
			headers: { 'Authorization': obj.token }
		})
			.then(( data ) => {
                dispatch( load() );
			})
			.catch(( error ) => {
                const errorUppdateCities = (error) => {
                    return {
                        type: 'ERROR_UPPDATE_CITIES',
                        error: error,
                    }
                }
				dispatch( errorUppdateCities() );
			})
	}
}

export const removeCountryOrCity = ( obj ) => {
	return ( dispatch ) => {
		axios({
			method: 'delete',
			url: 'http://localhost:3000/countries',
			data: obj.cities === undefined
					? { id: obj.id }
					: { id: obj.id, cities: obj.cities },
			headers: { 'Authorization': obj.token }
		})
			.then(( data ) => {
                dispatch( load() );
			})
			.catch(( error ) => {
                const errorRemoveCountriesOrCities = ( error ) => {
                    return {
                        type: 'ERROR_REMOVE_COUNTRIES_OR_CITIES',
                        error: error,
                    }
                }
				dispatch( errorUppdateCities() );
			})
	}
}