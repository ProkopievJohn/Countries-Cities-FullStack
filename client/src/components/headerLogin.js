import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>login</div>
		)
	}
}

export default connect()(Login);

// var Login = React.createClass({
// 	render: function () {
// 		return (
// 			<div id="login-signup" class="navbar-form navbar-right">
// 				<div className="user">
// 					<button id="logout" className="btn btn-default" type="button">
// 						logout <span className="glyphicon glyphicon-log-out"></span>
// 					</button>
// 					<div className="user-name">hello <span className="badge">user</span></div>
// 				</div>
// 				<div className="form-group hide">
// 					<div className="input-group">
// 						<input id="name" className="form-control" type="text" placeholder="name" />
// 					</div>
// 					<div className="input-group">
// 						<input id="password" className="form-control" type="password" placeholder="password" />
// 						<div className="input-group-btn">
// 							<button id="login" className="btn btn-default" type="button">
// 								Log In
// 							</button>
// 							<button id="signup" className="btn btn-default" type="button">
// 								Sign Up
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		)
// 	}
// });
