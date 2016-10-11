export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_COUNTRIES':
			return { ...state, fetchCountries: action.payload }
		default:
			return state
	}
}
