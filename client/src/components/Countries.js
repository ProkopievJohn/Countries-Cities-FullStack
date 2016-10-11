import React from 'react';
import Form from './CountriesCitiesForm.js';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Countries extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: '',
			search: ''
		}
	}

	componentWillReceiveProps(nextProps) {
		const countries = nextProps.countries;
		this.props.dispatch(actions.showCountries(countries));
		const countryFromCity = !nextProps.enterCity ? '' : nextProps.enterCity.id;
		this.setState({ selected: countryFromCity, search: countryFromCity })
		if (countryFromCity !== '') this.props.dispatch(actions.enterCountry({ id: countryFromCity, new: false }));
	}

	enterCountry(id) {
		let name = this.state.selected === id ? '' : id;
		this.setState({ selected: name, search: name })
		this.props.dispatch(actions.enterCountry({ id: name, new: false }));
	}

	handleSearch(text) {
		this.setState({ search: text })
	}

	filterCountries(countries) {
		const showCountries = countries.filter((country) => {
			return country.id.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
		});
		this.props.dispatch(actions.showCountries(showCountries));
		return showCountries;
	}

	renderCountries(item, i) {
		return (
			<li
				key={ i }
				className={ this.state.selected === item.id ? ' selected ' : ' ' }
				onClick={ this.enterCountry.bind(this, item.id) }
			>
				{item.id}
			</li>
		)
	}

	addNew(newCountry) {
		console.log('COUNTRY', newCountry);
		
	}

	render() {
		const countries = this.props.countries || [{id: 'no countries', cities: ['no cities']}];
		const filterCountries = this.filterCountries(countries);
		return (
			<div id="countries" className="col-sm-6" >
				<Form select="country" handleSearch={this.handleSearch.bind(this)} addNew={this.addNew.bind(this)} />
				<ul id="countries-list" className="col-sm-12 list">
					{filterCountries.map(this.renderCountries.bind(this))}
				</ul>
			</div>
		);
	}
}

export default connect(
	(state) => { return { countries: state.fetchCountries.fetchCountries, enterCity: state.enterCity.enterCity } }
)(Countries)
