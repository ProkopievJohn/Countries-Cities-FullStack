import React from 'react';
import Form from './CountriesCitiesForm.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newCountry, displayCountries } from '../actions/index';


class Countries extends React.Component {
	static propTypes = {
		selected: React.PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			selected: ''
		}
	}

	enterCountry(id, e) {

	}

	handleSearch(text) {
		const countries = this.props.countries;
		let response = countries.filter((item, i) => {
			if (item.id.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
				return item;
			}
		})
		console.log(response);
		// this.props.chooseCountries(response);
	}

	render() {
		let text = '';
		console.log(this.props);
		// const countries = this.props.countries.data || [];
		// const countries = [];
		// if (countries.length > 0) {
		// 	text = countries.map((item, i) => {
		// 		return (
		// 			<li
		// 				key={i}
		// 				className={this.state.selected === item.id ? ' selected ' : ' '}
		// 				onClick={this.enterCountry.bind(this, item.id)}
		// 			>{item.id}</li>
		// 		)
		// 	})
		// }
		return (
			<div id="countries" className="col-sm-6" >
				<Form select="country" handleSearch={this.handleSearch.bind(this)} />
				<ul id="countries-list" className="col-sm-12 list">
					{text}
				</ul>
			</div>
		);
	}
}

export default connect(
	(state) => { return { countries: state.listDisplayCountries } },
	// (dispatch) => { return bindActionCreators({ chooseCountries }, dispatch) }
)(Countries)


