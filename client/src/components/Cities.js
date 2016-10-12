import React from 'react';
import SearchForm from './SearchForm';
import { connect } from 'react-redux';
import * as actions from '../actions';


class Cities extends React.Component {
	constructor(props) {
		super(props);
	}

	selectCity(item, boolean) {
		const showCountriesCities = this.props.showCountriesCities;
		this.props.dispatch(actions.selectCity( boolean ? undefined : { id: item.id, city: item.city, old: true } ));
	}

	filterCities(textForm) {
		const text = textForm || '';
		const showCountriesCities = this.props.showCountriesCities;
		
		const showCities = showCountriesCities.filter((item) => {
			return item.city.toLowerCase().indexOf(text.toLowerCase()) !== -1;
		});
		showCities.checkBtn = text === '';
		this.props.dispatch(actions.showCities(showCities))
	}

	renderCities(item, i) {
		const className = this.props.selectCity === undefined ? null : this.props.selectCity.id + this.props.selectCity.city;
		return (
			<li
				key={ i }
				className={ className === item.id + item.city ? ' selected ' : ' ' }
				onClick={ this.selectCity.bind(this, item, className === item.id + item.city) }
			>
				{item.city}
			</li>
		)
	}

	newCity(newCity) {
		const showCountriesCities = this.props.showCountriesCities;
		let old = false;

		for (var i = showCountriesCities.length - 1; i >= 0; i--) {
			if (showCountriesCities[i].city.toLowerCase() === newCity.toLowerCase()) old = true;
		}
		this.props.dispatch(actions.selectCity({ city: newCity, old: old }));
	}

	render() {
		const showCities = this.props.showCities;

		return (
			<div id="cities" className="col-sm-6" >
				<SearchForm
					onChange={this.filterCities.bind(this)}
					onClick={this.newCity.bind(this)}
					id={'cities'}
					textBtn={'Add City'}
					disabled={ showCities === undefined ? true : showCities.checkBtn === undefined ? true : showCities.checkBtn }
				/>
				<ul id="cities-list" className="col-sm-12 list">
					{showCities.map(this.renderCities.bind(this))}
				</ul>
			</div>
		);
	}
}

export default connect(
	(state) => { return {
						showCountriesCities: state.showCountriesCities.showCountriesCities,
						showCities: state.showCities.showCities,
						selectCity: state.selectCity.selectCity,
						}
					}
)(Cities)
