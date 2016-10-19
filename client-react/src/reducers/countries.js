export const countries = (state = 'SHOW_ALL_COUNTRIES', action) => {
	switch (action.type) {
		case 'LOADED_COUNTRIES':
			return { ...state, loaded: action.payload }
		case 'SHOW_COUNTRIES':
			return { ...state, show: action.payload }
		case 'SELECT_COUNTRY':
			return { ...state, select: action.payload };
		default:
			return state
	}
}
