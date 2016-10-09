import React from 'react'
import Form from './CountriesCitiesForm.js'
import { connect } from 'react-redux'


class Countries extends React.Component {
	static propTypes = {
		selected: React.PropTypes.string,
		displayCountries: React.PropTypes.array
	};

	constructor(props) {
		super(props);
		this.state = {
			selected: '',
			displayCountries: []
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({displayCountries: nextProps.countries.countries});
	}

	enterCountry(e) {
		let target = e.target;
		this.setState({ selected: target.innerHTML, name: target.innerHTML });
	}

	handleSearch(text) {
		let countries = this.props.countries.countries;
		let displayCountries = countries.filter((item, i) => {
			if (item.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
				return item;
			}
		})
		this.setState({displayCountries});
	}

	render() {
		let text = '';
		let displayCountries = this.state.displayCountries;
		if (displayCountries.length > 0) {
			text = displayCountries.map((item, i) => {
				return (
					<li
						key={i}
						className={this.state.selected === item ? 'selected' : ''}
						onClick={this.enterCountry.bind(this)}
					>{item}</li>
				);
			});
		}
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
	(state) => { return { countries: state.countries } },
	// (dispatch) => { return { pageActions: bindActionCreators(pageActions, dispatch) } }
)(Countries)


