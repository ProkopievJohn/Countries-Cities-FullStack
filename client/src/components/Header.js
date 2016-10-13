import React from 'react';
import Response from './headerResponse';
import Login from './headerLogin';
import { connect } from 'react-redux';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="navbar navbar-default">
				<div className="container-fluid row">
					<Response />
					<Login />
				</div>
			</div>
		);
	}
}

export default connect()(Header)