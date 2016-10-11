import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Response extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addBtn: true,
			updateBtn: true,
			removeBtn: true,
			country: '',
			city: '',
		}
	}


	componentWillReceiveProps(nextProps) {
		// console.log(nextProps.enterCountry === undefined, nextProps.enterCity === undefined);
		// if (nextProps.enterCountry === undefined && nextProps.enterCity === undefined) return;
		const data = { country: nextProps.enterCountry || { id: '', new: false }, city: nextProps.enterCity || { city: '', new: false } }
		this.setState({
			country: data.country.id,
			city: data.city.city,
			// addBtn: !(data.country.id !== '' || data.city.id !== '') ? true : data.country.id === 
		});
		console.log(!(data.country.id !== '' || data.city.id !== ''));
	}

	render() {
		return (
			<div id="response" className="navbar-form navbar-left" >
				<div id="response-btn" className="btn-group">
					<button id="response-add-data" className="btn btn-default" type="button" disabled={this.state.addBtn}>
						add new <span className="glyphicon glyphicon-ok"></span>
					</button>
					<button id="response-update-data" className="btn btn-default" type="button" disabled={this.state.updateBtn}>
						update <span className="glyphicon glyphicon-refresh"></span>
					</button>
					<button id="response-remove-data" className="btn btn-default" type="button" disabled={this.state.removeBtn}>
						remove <span className="glyphicon glyphicon-trash"></span>
					</button>
				</div>
				<div id="data-for-response">country: {this.state.country}; city: {this.state.city};</div>
			</div>
		);
	}
}
//					<button id="response-clear-data" className="btn btn-default" type="button">
//						clear <span className="glyphicon glyphicon-remove"></span>
//					</button>

export default connect(
	(state) => { return { enterCountry: state.enterCountry.enterCountry, enterCity: state.enterCity.enterCity } }
)(Response)
