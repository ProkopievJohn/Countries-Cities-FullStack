import React from 'react';
import Form from './CountriesCitiesForm.js';
import { connect } from 'react-redux';
import * as actions from '../actions';


class Cities extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: '',
			search: ''
		}
	}

	enterCity(item) {
		let name = this.state.selected === item.id + item.city ? '' : item.id + item.city;
		this.setState({ selected: name })
		let resObj = this.state.selected === item.id + item.city ? { city: '', id: '', new: false } : { city: item.city, id: item.id, new: false };
		
		this.props.dispatch(actions.enterCity(resObj));
	}

	handleSearch(text) {
		this.setState({ search: text })
	}

	createCitiesArr(countries) {
		let cities = [];
		countries.filter((item, i) => {
			for (var i = 0; i < item.cities.length; i++) {
				cities.push({ id: item.id, city: item.cities[i] });
			}
		});
		return cities;
	}

	filterCities(cities) {
		const showCities = cities.filter((city) => {
			return city.city.toLowerCase().indexOf(this.state.search) !== -1;
		});
		return showCities;
	}

	renderCities(item, i) {
		return (
			<li
				key={ i }
				className={ this.state.selected === item.id + item.city ? ' selected ' : ' ' }
				onClick={ this.enterCity.bind(this, item) }
			>
				{item.city}
			</li>
		)
	}

	addNew(newCity) {
		console.log('CITY', newCity);
	}

	render() {
		const countries = this.props.countries;
		const citiesArr = this.createCitiesArr(countries);
		const filterCities = this.filterCities(citiesArr);
		return (
			<div id="cities" className="col-sm-6" >
				<Form select="cities" handleSearch={this.handleSearch.bind(this)} addNew={this.addNew.bind(this)} />
				<ul id="cities-list" className="col-sm-12 list">
					{filterCities.map(this.renderCities.bind(this))}
				</ul>
			</div>
		);
	}
}

export default connect(
	(state) => { return { countries: state.showCountries.showCountries } }
)(Cities)
