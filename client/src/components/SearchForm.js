import React from 'react';

class SearchForm extends React.Component {
	constructor(props) {
		super(props)
	}

	handleChange() {
		let input = this.refs.input.value;
		this.props.onChange(input);
	}

	addNew() {
		let input = this.refs.input.value;
		input = input[0].toUpperCase() + input.slice(1);
		this.props.onClick(input);
	}

	render () {
		return (
			<div className="form-group col-sm-12">
				<label htmlFor={this.props.id + '-input'}>{this.props.id}</label>
				<div className="input-group">
					<input
						id={this.props.id + '-input'}
						className="form-control"
						type="text"
						ref="input"
						onChange={this.handleChange.bind(this)}
						placeholder={"select " + (this.props.id)}
					/>
					<div className="input-group-btn">
						<button
							id={this.props.id + '-btn'}
							className="btn btn-default"
							type="button"
							ref="btn"
							onClick={this.addNew.bind(this)}
							disabled={this.props.disabled}
						>
							{this.props.textBtn}
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default SearchForm;