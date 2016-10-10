import axios from 'axios';
import store from '../state';

export function getData() {
	return axios.get('http://localhost:3000/countries')
		.then((res) => {
			return res.data
		});
}

export function postCountry(obj) {
	return axios.post('http://localhost:3000/countries', obj)
		.then((res) => {
			console.log(res);
		})
}
