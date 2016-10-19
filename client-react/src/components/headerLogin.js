import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
		this.loginSend = this.loginSend.bind(this);
	}

	signupSend() {
		const user = { name: this.refs.name.value, password: this.refs.password.value };
		this.props.dispatch( actions.signup( user ) );
	}

	loginSend() {
		const user = { name: this.refs.name.value, password: this.refs.password.value };
		this.props.dispatch( actions.user.login( user ) );
	}

	logout() {
		this.props.dispatch( actions.user.logout() );
	}

	render() {
		const user = this.props.user || { user: { success: false, message: '', token: '', user: { name: '' } } };
		if (user.user === undefined) {user.user = { name: '' } }
		return (
			<div id="login-signup" className="col-sm-4">
				<div className={ "user " + ( user.success ? ' ' : ' hide ' ) }>
					<button id="logout" className="btn btn-default" type="button" onClick={ this.logout } >
						logout <span className="glyphicon glyphicon-log-out"></span>
					</button>
					<div className="user-name">Hello <span className="badge">{ user.user.name }</span></div>
				</div>
				<div className={ "row " + ( user.success ? ' hide ' : '' ) }>
					<div className="login-group col-sm-12">
						<div className="p-0 form-group col-sm-4">
							<input ref="name" id="name" className="form-control" type="text" placeholder="name" />
						</div>
						<div className="p-0 form-group col-sm-4">
							<input ref="password" type="password" className="form-control" id="exampleInputPassword3" placeholder="Password" />
						</div>
						<div className="input-group-btn col-sm-4 p-0">
							<button id="login" className="btn btn-default" type="button" onClick={ this.loginSend } >
								Log In
							</button>
							<button id="signup" className="btn btn-default" type="button" onClick={ this.signupSend } >
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(
	(state) => { return { user: state.user.user } }
)(Login);
