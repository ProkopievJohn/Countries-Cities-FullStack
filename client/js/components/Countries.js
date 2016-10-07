import React from 'react'
import Form from './CountriesCitiesForm.jsx'
import { connect } from 'react-redux'


class Countries extends React.Component {
	static propTypes = {
		selected: React.PropTypes.string.isRequired
	};


	constructor(props) {
		super(props);
		this.state = {
			selected: ''
		}
	}


	enterCountry(e) {
		let target = e.target;
		this.setState({ selected: target.innerHTML });
	}


	render() {
		console.log(this.props.countries);
		// let text = 'no';
		// if (this.props.countries.length > 0) {
		// 	let countries = this.props.countries.countries;
		// 	text = countries.map((item, i) => {
		// 		return (
		// 			<li
		// 				key={i}
		// 				className={this.state.selected === item ? 'selected' : ''}
		// 				onClick={this.enterCountry.bind(this)}
		// 			>{item}</li>
		// 		);
		// 	});
		// }
		return (
			<div id="countries" className="col-sm-6" >
				<Form select="country" />
				<ul id="countries-list" className="col-sm-12 list">
					{text}
				</ul>
			</div>
		);
	}
}

export default connect(
	(state) => { return { countries: state.countries } },
	// (dispatch) => { return { pageActions: bindActionCreators(pageActions, dispatch) } }
)(Countries)


