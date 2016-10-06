import React from 'react'
import Form from './CountriesCitiesForm.jsx'


export default class Cities extends React.Component {
	static propTypes = {
		cities: React.PropTypes.array.isRequired
	};


	constructor(props) {
		super(props);
		this.state = {
			selected: ''
		}
	}

	enterCities(i, e) {
		let target = e.target;
		this.setState({ selected: i });
	}

	render() {
		let cities = this.props.cities;
		let text;
		let self = this;

		if (cities.length > 0) {
			text = cities.map(function(item, i) {
				return (
					<li
						key={i}
						className={ self.state.selected === i ? 'selected' : '' }
						country-name='item.id'
						onClick={self.enterCities.bind(self, i)}
					>{item.city}</li>
				);
			});
		}
		return (
			<div id="countries" className="col-sm-6" >
				<Form select="city" />
				<ul id="cities-list" className="col-sm-12 list">
					{text}
				</ul>
			</div>
		);
	}
}
