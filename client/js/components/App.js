import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Countries from './Countries'
import Cities from './Cities'


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
	render () {
		const countries = this.props.countries;
		const cities = this.props.cities;
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

export default connect(
	(state) => { return { state: state } }
)(App)