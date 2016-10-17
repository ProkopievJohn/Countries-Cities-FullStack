import React from 'react';
// import SearchForm from './SearchForm';
import ListEl from './ListEl'
import { connect } from 'react-redux';
import * as actions from '../actions';



class Countries extends React.Component {
	func() {}

	render() {
		const fetchCountries = this.props.fetchCountries || [{id: 'no countries', cities: ['no cities']}];
		const showCountries = this.props.showCountries;
		console.log(showCountries)
		return (
			<div id="countries" className="col-sm-6" >
				<ul id="countries-list" className="col-sm-12 list">
					{this.renderCountries.bind(this)}
					<ListEl item={{id: 'id'}} onClick={this.func.bind(this)} />
				</ul>
			</div>
		);
	}
}

export default connect(
	(state) => { return {
						fetchCountries: state.countries.fetch,
						showCountries: state.countries.show,
						// selectCountry: state.selectCountry.selectCountry,
					}
				}
)(Countries)




				// <SearchForm
					// onChange={this.filterCountries.bind(this)}
					// onClick={this.newCountry.bind(this)}
					// id={'countries'}
					// textBtn={'Add Country'}
					// disabled={showCountries.checkBtn === undefined ? true : showCountries.checkBtn}
				// />
					// {showCountries.map(this.renderCountries.bind(this))}

	// renderCountries(item, i) {
	// 	const className = this.props.selectCountry === undefined ? null : this.props.selectCountry.id;
	// 	return (
	// 		<li
	// 			key={ i }
	// 			className={ className === item.id ? ' selected ' : ' ' }
	// 			onClick={ this.selectCountry.bind(this, item, className === item.id) }
	// 		>
	// 			{item.id}
	// 		</li>
	// 	)
	// }
		// const showCountries = this.props.showCountries;
		// this.props.dispatch(actions.showCountriesCities(this.showCountriesCities(showCountries)));
		// this.props.dispatch(actions.showCities(this.showCountriesCities(showCountries)));

	// selectCountry(item, boolean) {
	// 	const fetchCountries = this.props.fetchCountries;
	// 	this.props.dispatch(actions.selectCountry( boolean ? undefined : { id: item.id, old: true } ));
	// 	this.props.dispatch(actions.showCountries( boolean ? fetchCountries : [item] ));
	// }

	// newCountry(newCountry) {
	// 	const fetchCountries = this.props.fetchCountries;
	// 	let old = false;
		
	// 	for (var i = fetchCountries.length - 1; i >= 0; i--) {
	// 		if (fetchCountries[i].id.toLowerCase() === newCountry.toLowerCase()) old = true;
	// 	}

	// 	this.props.dispatch(actions.selectCountry({ id: newCountry, old: old }));
	// }


	// showCountriesCities(showCountries) {
	// 	let cities = [];
	// 	showCountries.forEach((item, i) => {
	// 		for (var i = 0; i < item.cities.length; i++) {
	// 			cities.push({ id: item.id, city: item.cities[i] });
	// 		}
	// 	});
	// 	return cities;
	// }


	// filterCountries(textForm) {
	// 	const text = textForm || '';
	// 	const fetchCountries = this.props.fetchCountries;
		
	// 	const showCountries = fetchCountries.filter((item) => {
	// 		return item.id.toLowerCase().indexOf(text.toLowerCase()) !== -1;
	// 	});
	// 	showCountries.checkBtn = text === '';
	// 	this.props.dispatch(actions.showCountries(showCountries));

	// }




