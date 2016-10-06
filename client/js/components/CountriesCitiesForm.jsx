import React from 'react'
import {EventEmitter} from 'events'


export default class CountriesCitiesForm extends React.Component {
	static propTypes = {
		select: React.PropTypes.string
	};

	constructor(props) {
		super(props);
		this.events = new EventEmitter();
		this.state = { checkBtn: true };
	}

	textChange() {
		let input = this.refs.input.value;
		this.setState({ checkBtn: input.trim().length > 0 ? false : true });

		this.events.emit('select', input);
		console.log('form events', this.events);
	}

	render() {
		return (
			<div className="form-group col-sm-12">
				<label for="country-city-input">{this.props.select}</label>
				<div className="input-group">
					<input
						id="country-city-input"
						className="form-control"
						type="text" ref="input"
						onChange={this.textChange.bind(this)}
						placeholder={"select " + (this.props.select)}
					/>
					<div className="input-group-btn">
						<button
							id="country-city-btn"
							className="btn btn-default"
							type="button"
							ref="btn"
							disabled={this.state.checkBtn}
						>Add {this.props.select}</button>
					</div>
				</div>
			</div>
		);
	}
}
