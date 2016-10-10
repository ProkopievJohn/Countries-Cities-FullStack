import store from '../state';
import { getData, postCountry } from '../api/index';

const getCountriesData = () => {
	return {
		type: 'PROMISE',
		actions: ['START_LOAD_COUNTRIES_DATA', 'LOAD_COUNTRIES_DATA', 'ERROR_LOAD_COUNTRIES_DATA'],
		promise: getData()
	}
};

const newCountry = (newCountry) => {
	return {
		type: 'SET_COUNTRY',
		newCountry: newCountry
	}
}

const listDisplayCountries = (data) => {
	return {
		type: 'LIST_DISPLAY_COUNTRY',
		data: data
	}
}

export { getCountriesData }
export { newCountry }
export { listDisplayCountries }