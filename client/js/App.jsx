import React from 'react'
import {EventEmitter} from 'events'
import {render} from 'react-dom'
import Header from './components/Header.jsx'
import Countries from './components/Countries.jsx'
import Cities from './components/Cities.jsx'

import { Dispatcher } from 'flux'

console.log(Dispatcher);

	let countriesDefault = [
		{
			id: 'Canada',
			cities: ["Toronto", "Montreal", "Vancouver", "Lachine", "Mississauga", "Leamington", "Camrose", "Richmond"]
		},
		{
			id: 'Denmark',
			cities: ["Copenhagen", "Frederiksberg", "Bronshoj", "Albertslund", "HillerÃ¸d", "FrederiksvÃ¦rk", "Vasby"]
		},
		{
			id: 'Iceland',
			cities: ["Reykjavik", "Selfoss", "Grindavik", "KeflavÃ­k", "Dalvik", "Akureyri", "Hvammstangi", "Husavik"]
		},
		{
			id: 'Norway',
			cities: ["Jar", "Karlshus", "Moss", "Oslo", "Frogner", "Drammen", "Vestby", "Aursmoen", "Tranby", "Bergen"]
		},
		{
			id: 'United States',
			cities: ["Mukilteo", "Fairfield", "Chicago", "Hernando", "Irving", "Baltimore", "Kingston", "Burlington"]
		}
	];

class App extends React.Component {
	constructor() {
		super();
		this.state = { data: [] }
	}

	loadCountriesSitiesFromServer() {
		this.setState({ data:countriesDefault })
	}

	componentDidMount() {
		this.loadCountriesSitiesFromServer();
	}

	render () {
		let data = this.state.data;

		let countries = [];
		let cities = [];
		
		data.forEach(function (item, index) {
			countries.push(item.id);
			for (var i = 0; i < item.cities.length; i++) {
				cities.push({ city: item.cities[i], id: item.id });
			}
		})

		return (
			<div>
				<Header />
				<section className='container-fluid'>
					<div className="row">
						<Countries countries={countries} />
						<Cities cities={cities} />
					</div>
				</section>
			</div>
		);
	}
}

render(
	<App />,
	document.querySelector('#react-app')
)


