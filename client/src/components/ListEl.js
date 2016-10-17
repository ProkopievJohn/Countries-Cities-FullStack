// import React from 'react';
// import { connect } from 'react-redux';


// export class ListEl extends React.Component {
// 	constructor(props) {
// 		super(props);
// 	}

// 	render() {
// 		const item = this.props.item;
// 		console.log(item);
// 		return (
// 			<li>
// 				{item.id}
// 			</li>
// 			);
// 	}
// }

	// renderCountries(item, i) {
	// 	const className = this.props.selectCountry === undefined ? null : this.props.selectCountry.id;
	// 	return (
	// 		<li
	// 			key={ i }
	// 			className={ className === item.id ? ' selected ' : ' ' }
	// 			onClick={ this.selectCountry.bind(this, item, className === item.id) }
	// 		>
	// 			{item.id}
	// 		</li>
	// 	)
	// }

// export default connect()(ListEl)

import React, { PropTypes } from 'react'

const ListEl = ({ item, onClick }) => (
	<li
		onClick={ onClick }
		className=" "
	>
		{item.id}
	</li>
)

ListEl.propTypes = {
	item: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default ListEl
