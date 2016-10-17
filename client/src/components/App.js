import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Countries from './Countries';
import Cities from './Cities';
import * as actions from '../actions';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.props.dispatch(actions.countries.fetch());
	}

	render () {
		const fetchCountries = this.props.fetchCountries || [{id: 'no countries', cities: ['no cities']}];
		this.props.dispatch(actions.countries.show(fetchCountries));
		return (
			<div>
				<section className='container-fluid'>
					<div className='row'>
						<Countries />
					</div>
				</section>
			</div>
		);
	}
}
				// <Header />
						// <Cities />

export default connect(
	(state) => { return { fetchCountries: state.countries.fetch, } }
)(App)
