import React, { PropTypes } from 'react'

const ListEl = ({ text, onClick, className }) => (
	<li
		onClick={ onClick }
		className={ className }
	>
		{ text }
	</li>
)

ListEl.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default ListEl
