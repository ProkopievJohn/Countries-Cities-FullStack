import React from 'react';
import SearchForm from './SearchForm';
import ListEl from './ListEl';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Countries extends React.Component {
	constructor(props) {
		super(props);
		this.selectCountry = this.selectCountry.bind(this);
		this.newCountry = this.newCountry.bind(this);
		this.searchCountries = this.searchCountries.bind(this);
		// this.value = this.value.bind(this);
	}

	searchCountries( e ) {
		const value = e.target.value;
		const loadedCountries = this.props.loadedCountries || [{ id: 'no countries', cities: [ 'no cities' ] }];
		const showCountries = loadedCountries.filter(( item ) => {
			return item.id.toLowerCase().indexOf( value.toLowerCase() ) !== -1;
		});
		showCountries.checkBtn = value.trim().length === 0;
		this.props.dispatch( actions.countries.show( showCountries ) );
		this.value = value;
	}

	newCountry() {
		const nameCountry = this.value[0].toUpperCase() + this.value.slice(1);
		this.props.dispatch( actions.countries.select( { id: nameCountry, old: false } ) )
	}

	selectCountry( item ) {
		const selectCountry = this.props.selectCountry === undefined ? { id: '' } : this.props.selectCountry;
		const loadedCountries = selectCountry.id === item.id 
									? this.props.loadedCountries || [{ id: 'no countries', cities: [ 'no cities' ] }]
									: [item];
		this.props.dispatch( actions.countries.show( loadedCountries ) );
		this.props.dispatch( actions.countries.select( selectCountry.id === item.id ? undefined : { ...item, old: true } ) )
	}

	renderCountriesList() {
		const className = this.props.selectCountry === undefined ? null : this.props.selectCountry.id;
		const showCountries = this.props.showCountries || [{ id: 'no countries', cities: [ 'no cities' ] }];
		return showCountries.map((item, i) => {
			return <ListEl
						key={ i }
						text={ item.id }
						onClick={ () => { this.selectCountry(item) } }
						className={ className === item.id ? ' selected ' : ' ' }
					/>
		})
	}

	render() {
		const checkBtn = this.props.showCountries === undefined ? true : this.props.showCountries.checkBtn === undefined ? true : this.props.showCountries.checkBtn;
		return (
			<div id="countries" className="col-sm-6" >
				<SearchForm
					id={ 'countries' }
					onChange={ this.searchCountries }
					onClick={ this.newCountry }
					disabled={ checkBtn }
					textBtn={ 'Add Country' }
				/>
				<ul id="countries-list" className="col-sm-12 list">
					{ this.renderCountriesList() }
				</ul>
			</div>
		);
	}
}

export default connect(
	(state) => { return {
						loadedCountries: state.countries.loaded,
						showCountries: state.countries.show,
						selectCountry: state.countries.select,
					}
				}
)(Countries)
