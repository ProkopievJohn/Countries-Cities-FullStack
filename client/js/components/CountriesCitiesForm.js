import React from 'react'
import store from '../state'
import { connect } from 'react-redux'


class CountriesCitiesForm extends React.Component {
	static propTypes = {
		select: React.PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = { checkBtn: true };
	}

	handleChange() {
		let input = this.refs.input.value;
		this.setState({ checkBtn: input.trim().length > 0 ? false : true });
		this.props.handleSearch(input);
	}

	addCountry() {
		let input = this.refs.input.value;
	}

	render() {
		return (
			<div className="form-group col-sm-12">
				<label htmlFor={this.props.select + '-input'}>{this.props.select}</label>
				<div className="input-group">
					<input
						id={this.props.select + '-input'}
						className="form-control"
						type="text"
						ref="input"
						onChange={this.handleChange.bind(this)}
						placeholder={"select " + (this.props.select)}
					/>
					<div className="input-group-btn">
						<button
							id={this.props.select + '-btn'}
							className="btn btn-default"
							type="button"
							ref="btn"
							onClick={this.addCountry.bind(this)}
							disabled={this.state.checkBtn}
						>Add {this.props.select}</button>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	(state) => { return { id: state.countries } }
)(CountriesCitiesForm)
