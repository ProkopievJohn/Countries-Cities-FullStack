import React from 'react';

export default class Response extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="response" className="navbar-form navbar-left" >
				<div id="response-btn" className="btn-group">
					<button id="response-add-data" className="btn btn-default" type="button" disabled>
						add new <span className="glyphicon glyphicon-ok"></span>
					</button>
					<button id="response-update-data" className="btn btn-default" type="button" disabled>
						update <span className="glyphicon glyphicon-refresh"></span>
					</button>
					<button id="response-remove-data" className="btn btn-default" type="button" disabled>
						remove <span className="glyphicon glyphicon-trash"></span>
					</button>
					<button id="response-clear-data" className="btn btn-default" type="button">
						clear <span className="glyphicon glyphicon-remove"></span>
					</button>
				</div>
				<div id="data-for-response">country: ; city: ;"</div>
			</div>
		);
	}
}
