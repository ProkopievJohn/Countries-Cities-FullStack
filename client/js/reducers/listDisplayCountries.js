export default (state = [], action) => {
	switch (action.type) {
		case 'LIST_DISPLAY_COUNTRY':
			return { ...state, listDisplayCountries: action.data };
		default:
			return state
	}
}
