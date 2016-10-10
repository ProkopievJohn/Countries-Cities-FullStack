import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './Header';
import Countries from './Countries';
import Cities from './Cities';
import { getCountriesData, listDisplayCountries } from '../actions/index';


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			displayCities: []
		}
	}

	componentDidMount() {
		this.props.getCountriesData();
	}

	componentWillReceiveProps(nextProps) {
		const countries = nextProps.countriesData.data;
		const cities = this.showCities(countries);
		this.props.listDisplayCountries(countries)

	}

	showCities(arrCountries) {
		let response = [];
		if (arrCountries === undefined) {return []}

		arrCountries.filter((item, i) => {
			for (var i = 0; i < item.cities.length; i++) {
				response.push({id: item.id, city: item.cities[i]})
			}
		})

		// return response.concat.apply([], response);
		return response;
	}

	render () {
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
	(state) => { return { countriesData: state.countriesData } },
	(dispatch) => { return bindActionCreators({ getCountriesData, listDisplayCountries }, dispatch) }
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