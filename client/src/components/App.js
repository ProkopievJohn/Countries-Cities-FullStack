import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Countries from './Countries';
import Cities from './Cities';
import * as actions from '../actions';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.props.dispatch(actions.fetchCountries())
	}

	render () {
		const fetchCountries = this.props.fetchCountries || [{id: 'no countries', cities: ['no cities']}];
		this.props.dispatch(actions.showCountries(fetchCountries))
		return (
			<div>
				<Header />
				<section className='container-fluid'>
					<div className="row">
						<Countries />
						<Cities />
					</div>
				</section>
			</div>
		);
	}
}

export default connect(
	(state) => { return { fetchCountries: state.fetchCountries.fetchCountries } }
)(App)


// let countriesDefault = [
// 	{
// 		id: 'Canada',
// 		cities: ["Toronto", "Montreal", "Vancouver", "Lachine", "Mississauga", "Leamington", "Camrose", "Richmond"]
// 	},
// 	{
// 		id: 'Denmark',
// 		cities: ["Copenhagen", "Frederiksberg", "Bronshoj", "Albertslund", "HillerÃ¸d", "FrederiksvÃ¦rk", "Vasby"]
// 	},
// 	{
// 		id: 'Iceland',
// 		cities: ["Reykjavik", "Selfoss", "Grindavik", "KeflavÃ­k", "Dalvik", "Akureyri", "Hvammstangi", "Husavik"]
// 	},
// 	{
// 		id: 'Norway',
// 		cities: ["Jar", "Karlshus", "Moss", "Oslo", "Frogner", "Drammen", "Vestby", "Aursmoen", "Tranby", "Bergen"]
// 	},
// 	{
// 		id: 'United States',
// 		cities: ["Mukilteo", "Fairfield", "Chicago", "Hernando", "Irving", "Baltimore", "Kingston", "Burlington"]
// 	}
// ];