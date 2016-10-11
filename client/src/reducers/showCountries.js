export default (state = [], action) => {
	switch (action.type) {
		case 'SHOW_COUNTRIES':
			return { ...state, showCountries: action.payload }
		default:
			return state
	}
}
