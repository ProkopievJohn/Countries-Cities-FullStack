import React, { PropTypes } from 'react'

const SearchForm = ({ id, onChange, onClick, disabled, textBtn }) => (
	<div className="form-group col-sm-12">
		<label htmlFor={ id + '-input' }>{ id }</label>
		<div className="input-group">
			<input
				id={ id + '-input' }
				className="form-control"
				type="text"
				onChange={ onChange }
				placeholder={ "select " + id }
			/>
			<div className="input-group-btn">
				<button
					id={ id + '-btn' }
					className="btn btn-default"
					type="button"
					onClick={ onClick }
					disabled={ disabled }
				>
					{ textBtn }
				</button>
			</div>
		</div>
	</div>
)

SearchForm.propTypes = {
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired,
	textBtn: PropTypes.string.isRequired,
}

export default SearchForm
