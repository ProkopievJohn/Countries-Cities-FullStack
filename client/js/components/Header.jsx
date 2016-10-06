import React from 'react';
import Response from './headerResponse.jsx';

export default class Header extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="navbar navbar-default">
				<div className="container-fluid">
				<Response />
					header
				</div>
			</div>
		);
	}
}
