import React from 'react'
// import Form from './CountriesCitiesForm.jsx'
import { connect } from 'react-redux'


class Cities extends React.Component {
	// static propTypes = {
	// 	cities: React.PropTypes.array.isRequired
	// };


	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		selected: ''
	// 	}
	// }


	// enterCities(i, e) {
	// 	let target = e.target;
	// 	this.setState({ selected: i });
	// }


	render() {
		// let text = 'no';
		// if (this.props.cities.cities.length > 0) {
		// 	let cities = this.props.cities.cities;
		// 	text = cities.map((item, i) => {
		// 		return (
		// 			<li
		// 				key={i}
		// 				className={ this.state.selected === i ? 'selected' : '' }
		// 				country-name='item.id'
		// 				onClick={this.enterCities.bind(this, i)}
		// 			>{item.city}</li>
		// 		);
		// 	});
		// }
		return (
			<div id="cities" className="col-sm-6" >
			</div>
		);
	}
}

export default connect(
	(state) => { return { cities: state.cities } }
)(Cities)
				// <Form select="city" />
				// <ul id="cities-list" className="col-sm-12 list">
				// 	{text}
				// </ul>
