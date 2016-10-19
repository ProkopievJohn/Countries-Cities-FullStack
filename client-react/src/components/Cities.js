import React from 'react';
import SearchForm from './SearchForm';
import ListEl from './ListEl';
import { connect } from 'react-redux';
import * as actions from '../actions';


class Cities extends React.Component {
	constructor(props) {
		super(props);
		this.selectCity = this.selectCity.bind(this);
		this.searchCities = this.searchCities.bind(this);
		this.newCity = this.newCity.bind(this);
	}

	selectCity( item ) {
		const selectCity = this.props.selectCity === undefined ? { id: '', city: '' } : this.props.selectCity;
		this.props.dispatch( actions.cities.select( selectCity.id + selectCity.city === item.id + item.city ? undefined : { ...item, old: true } ) );
	}

	searchCities( e ) {
		const value = e.target.value;
		const loadedCities = this.props.loadedCities || [{ id: 'no countries', city: 'no cities' }];
		const showCities = loadedCities.filter(( item ) => {
			return item.city.toLowerCase().indexOf( value.toLowerCase() ) !== -1;
		});
		showCities.checkBtn = value.trim().length === 0;
		this.props.dispatch( actions.cities.show( showCities ) );
		this.value = value;
	}

	newCity() {
		const nameCity = this.value[0].toUpperCase() + this.value.slice(1);
		this.props.dispatch( actions.cities.select( { city: nameCity, old: false } ) )
	}

	renderCitiesList() {
		const className = this.props.selectCity === undefined ? null : this.props.selectCity.id + this.props.selectCity.city;
		const showCities = this.props.showCities || [{ id: 'no countries', city: 'no cities' }];
		return showCities.map((item, i) => {
			return <ListEl
						key={ i }
						text={ item.city }
						onClick={ () => { this.selectCity( item ) } }
						className={ className === item.id + item.city ? ' selected ' : ' ' }
					/>
		});
	}

	render() {
		const checkBtn = this.props.showCities === undefined ? true : this.props.showCities.checkBtn === undefined ? true : this.props.showCities.checkBtn;
		return (
			<div id="cities" className="col-sm-6" >
				<SearchForm
					id={ 'cities' }
					onChange={ this.searchCities }
					onClick={ this.newCity }
					disabled={ checkBtn }
					textBtn={ 'Add City' }
				/>
				<ul id="cities-list" className="col-sm-12 list">
					{ this.renderCitiesList() }
				</ul>
			</div>
		);
	}
}

export default connect(
	(state) => { return {
						loadedCities: state.cities.loaded,
						showCities: state.cities.show,
						selectCity: state.cities.select,
						}
					}
)(Cities)

	// selectCity(item, boolean) {
	// 	const showCountriesCities = this.props.showCountriesCities;
	// 	this.props.dispatch(actions.selectCity( boolean ? undefined : { id: item.id, city: item.city, old: true } ));
	// }

	// filterCities(textForm) {
	// 	const text = textForm || '';
	// 	const showCountriesCities = this.props.showCountriesCities;
		
	// 	const showCities = showCountriesCities.filter((item) => {
	// 		return item.city.toLowerCase().indexOf(text.toLowerCase()) !== -1;
	// 	});
	// 	showCities.checkBtn = text === '';
	// 	this.props.dispatch(actions.showCities(showCities))
	// }

	// renderCities(item, i) {
	// 	const className = this.props.selectCity === undefined ? null : this.props.selectCity.id + this.props.selectCity.city;
	// 	return (
	// 		<li
	// 			key={ i }
	// 			className={ className === item.id + item.city ? ' selected ' : ' ' }
	// 			onClick={ this.selectCity.bind(this, item, className === item.id + item.city) }
	// 		>
	// 			{item.city}
	// 		</li>
	// 	)
	// }

	// newCity(newCity) {
	// 	const showCountriesCities = this.props.showCountriesCities;
	// 	let old = false;

	// 	for (var i = showCountriesCities.length - 1; i >= 0; i--) {
	// 		if (showCountriesCities[i].city.toLowerCase() === newCity.toLowerCase()) old = true;
	// 	}
	// 	console.log(old);
	// 	this.props.dispatch(actions.selectCity({ id: '', city: newCity, old: old }));
	// }
