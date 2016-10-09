import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import store from './state';
import * as XMLLoad from './api'
import {Provider} from 'react-redux';

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#react-app')
)


let countriesDefault = [{id: 'Canada',cities: ["Toronto", "Montreal", "Vancouver", "Lachine", "Mississauga", "Leamington", "Camrose", "Richmond"]},{id: 'Denmark',cities: ["Copenhagen", "Frederiksberg", "Bronshoj", "Albertslund", "HillerÃ¸d", "FrederiksvÃ¦rk", "Vasby"]},{id: 'Iceland',cities: ["Reykjavik", "Selfoss", "Grindavik", "KeflavÃ­k", "Dalvik", "Akureyri", "Hvammstangi", "Husavik"]},{id: 'Norway',cities: ["Jar", "Karlshus", "Moss", "Oslo", "Frogner", "Drammen", "Vestby", "Aursmoen", "Tranby", "Bergen"]},{id: 'United States',cities: ["Mukilteo", "Fairfield", "Chicago", "Hernando", "Irving", "Baltimore", "Kingston", "Burlington"]}];

let countries = [];
let cities = [];
		
countriesDefault.forEach(function (item, index) {
	countries.push(item.id);
	for (var i = 0; i < item.cities.length; i++) {
		cities.push({ city: item.cities[i], id: item.id });
	}
})



store.dispatch({
	type: 'LOAD_CITIES',
	cities: cities
})

store.dispatch({
	type: 'LOAD_COUNTRIES',
	countries: countries
})
