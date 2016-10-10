import React from 'react'
import Form from './CountriesCitiesForm.js'
import { connect } from 'react-redux'


class Cities extends React.Component {
	static propTypes = {
		selected: React.PropTypes.string,
		displayCities: React.PropTypes.array
	};

	constructor(props) {
		super(props);
		this.state = {
			selected: ''
		}
	}

	enterCity(id, e) {

	}

	handleSearch(text) {

	}

	render() {
		let text = '';
		const cities = this.props.cities || [];
		if (cities.length > 0) {
			text = cities.map((item, i) => {
				return (
					<li
						key={i}
						className={this.state.selected === item.city ? ' selected ' : ' '}
						onClick={this.enterCity.bind(this, item.id)}
					>{item.city}</li>
				)
			})
		}
		return (
			<div id="cities" className="col-sm-6" >
				<Form select="country" handleSearch={this.handleSearch.bind(this)} />
				<ul id="cities-list" className="col-sm-12 list">
					{text}
				</ul>
			</div>
		);
	}
}

export default connect(
	// (state) => { return { cities: state.cities, displayCountries: state.displayCountries } },
	// (dispatch) => { return { pageActions: bindActionCreators(pageActions, dispatch) } }
)(Cities)
