import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Countries from './Countries';
import Cities from './Cities';
import * as actions from '../actions';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.props.dispatch(actions.countries.load());
	}

	render () {
		return (
			<div>
				<Header />
				<section className='container-fluid'>
					<div className='row'>
						<Countries />
						<Cities />
					</div>
				</section>
			</div>
		);
	}
}

export default connect(
)(App)
