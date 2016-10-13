import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Response extends React.Component {
	constructor(props) {
		super(props);
	}

	addNew(data) {
		if (data.id === '') return;
		this.props.dispatch(actions.addNewCountryOrCity(data));
	}

	updateCities(data) {
		if (data.id === '' || data.cities === '') return;
		this.props.dispatch(actions.updateCities(data));
	}

	remove(data) {
		if (data.id === '') return;
		this.props.dispatch(actions.removeCountryOrCity(data))
	}

	render() {
		let data = { id: '', token: '' };
		let checkAddBtn = true;
		let checkUppdateBtn = true;
		let checkRemoveBtn = true;
		const country = this.props.country;
		const cities = this.props.cities;
		const user = this.props.user;
		if (country !== undefined && user !== undefined) {
			data.id = country.id;
			data.token = user.token;
			checkAddBtn = country.old;
			checkRemoveBtn = !country.old;
		}
		if (cities !== undefined && user !== undefined) { 
			data.cities = cities.city;
		}
		if (cities !== undefined && country !== undefined && user !== undefined) {
			if (country.old && !cities.old) {
				checkUppdateBtn = false;
				checkRemoveBtn = true;
			}
			if (country.old && cities.old) {
				checkRemoveBtn = country.id === cities.id ? false : true;
				checkUppdateBtn = country.id === cities.id ? true : false;
			}
		}
		return (
			<div id="response" className="col-sm-7" >
				<div id="response-btn" className="btn-group">
					<button id="response-add-data" className="btn btn-default" type="button" disabled={checkAddBtn} onClick={this.addNew.bind(this, data)} >
						add new <span className="glyphicon glyphicon-ok"></span>
					</button>
					<button id="response-update-data" className="btn btn-default" type="button" disabled={checkUppdateBtn} onClick={this.updateCities.bind(this, data)} >
						update <span className="glyphicon glyphicon-refresh"></span>
					</button>
					<button id="response-remove-data" className="btn btn-default" type="button" disabled={checkRemoveBtn} onClick={this.remove.bind(this, data)} >
						remove <span className="glyphicon glyphicon-trash"></span>
					</button>
				</div>
				<div id="data-for-response">country: { data.id }; city: { data.cities };</div>
			</div>
		);
	}
}
//					<button id="response-clear-data" className="btn btn-default" type="button">
//						clear <span className="glyphicon glyphicon-remove"></span>
//					</button>

export default connect(
	(state) => { return {
						country: state.selectCountry.selectCountry,
						cities: state.selectCity.selectCity,
						user: state.login.user,
						}
					}
)(Response)
