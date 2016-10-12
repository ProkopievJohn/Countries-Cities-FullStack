import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Response extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let data = { id: '', city: '' };
		let checkAddBtn = true;
		let checkUppdateBtn = true;
		let checkRemoveBtn = true;
		const country = this.props.country;
		const city = this.props.city;
		if (country !== undefined) {
			data.id = country.id;
			checkAddBtn = country.old;
			checkRemoveBtn = !country.old;
		}
		if (city !== undefined) { 
			data.city = city.city;
		}
		if (city !== undefined && country !== undefined) {
			if (country.old && !city.old) checkUppdateBtn = city.old;
			if (country.old && city.old) checkRemoveBtn = !country.old;
			if (country.old && !city.old) checkRemoveBtn = country.old;
		}
		return (
			<div id="response" className="navbar-form navbar-left" >
				<div id="response-btn" className="btn-group">
					<button id="response-add-data" className="btn btn-default" type="button" disabled={checkAddBtn}>
						add new <span className="glyphicon glyphicon-ok"></span>
					</button>
					<button id="response-update-data" className="btn btn-default" type="button" disabled={checkUppdateBtn}>
						update <span className="glyphicon glyphicon-refresh"></span>
					</button>
					<button id="response-remove-data" className="btn btn-default" type="button" disabled={checkRemoveBtn}>
						remove <span className="glyphicon glyphicon-trash"></span>
					</button>
				</div>
				<div id="data-for-response">country: { data.id }; city: { data.city };</div>
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
						city: state.selectCity.selectCity,
						}
					}
)(Response)
