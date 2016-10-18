export const cities = (state = 'SHOW_ALL_CITIES', action) => {
	switch (action.type) {
		case 'LOADED_CITIES':
			return { ...state, loaded: action.payload };
		case 'SHOW_CITIES':
			return { ...state, show: action.payload };
		case 'SELECT_CITY':
			return { ...state, select: action.payload };
		default:
			return state
	}
}
