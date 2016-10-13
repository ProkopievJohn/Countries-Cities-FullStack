import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	loginForm(e) {
		// console.log(e.target);
	}

	signupSend() {
		const send = { name: this.refs.name.value, password: this.refs.password.value }
		this.props.dispatch(actions.signup(send));
	}

	loginSend() {
		const send = { name: this.refs.name.value, password: this.refs.password.value }
		this.props.dispatch(actions.login(send));
	}

	logout() {
		this.props.dispatch(actions.logout( undefined ));
	}

	render() {
		const user = this.props.user || { success: false, message: '', token: '', user: { name: '' } }
		if (user.user === undefined) {user.user = { name: '' } }
		return (
			<div id="login-signup" className="col-sm-5">
				<div className={"user " + ( user.success ? ' ' : ' hide ' )}>
					<button id="logout" className="btn btn-default" type="button" onClick={this.logout.bind(this)} >
						logout <span className="glyphicon glyphicon-log-out"></span>
					</button>
					<div className="user-name">Hello <span className="badge">{user.user.name}</span></div>
				</div>
				<div className={"row " + ( user.success ? ' hide ' : '' ) }>
					<div className="login-group col-sm-12">
						<div className="p-0 form-group col-sm-4">
							<input ref="name" id="name" className="form-control" type="text" placeholder="name" onChange={this.loginForm.bind(this)} />
						</div>
						<div className="p-0 form-group col-sm-4">
							<input ref="password" type="password" className="form-control" id="exampleInputPassword3" placeholder="Password" onChange={this.loginForm.bind(this)} />
						</div>
						<div className="input-group-btn col-sm-4 p-0">
							<button id="login" className="btn btn-default" type="button" disabled={false} onClick={this.loginSend.bind(this)} >
								Log In
							</button>
							<button id="signup" className="btn btn-default" type="button" disabled={false} onClick={this.signupSend.bind(this)} >
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
	(state) => { return { user: state.login.user } }
)(Login);
