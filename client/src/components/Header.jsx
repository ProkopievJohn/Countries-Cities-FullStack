import React from 'react';
import Response from './headerResponse.js';
import Login from './headerLogin.js';
import { connect } from 'react-redux';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="navbar navbar-default">
				<div className="container-fluid">
				<Response />
				<Login />
				</div>
			</div>
		);
	}
}

export default connect()(Header)