import React from 'react'
import Form from './CountriesCitiesForm.jsx'
import {EventEmitter} from 'events'

export default class Countries extends React.Component {
	static propTypes = {
		countries: React.PropTypes.array.isRequired
	};

	constructor(props) {
		super(props);
		this.events = new EventEmitter();
		console.log('country events', this.events);
		this.state = {
			selected: ''
		}
	}

	componentDidMount() {
		this.events.on('select', () => {console.log('elmi = on');})
	}

	enterCountry(e) {
		let target = e.target;
		this.setState({ selected: target.innerHTML })
	}

	render() {
		let countries = this.props.countries;
		let text;
		if (countries.length > 0) {
			text = countries.map((item, i) => {
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
				<Form select="country" />
				<ul id="countries-list" className="col-sm-12 list">
					{text}
				</ul>
			</div>
		);
	}
}

