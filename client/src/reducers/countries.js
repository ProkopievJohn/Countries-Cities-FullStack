export const countries = (state = [], action) => {
	switch (action.type) {
		case 'FETCH_COUNTRIES':
			return { ...state, fetch: action.payload }
		case 'SHOW_COUNTRIES':
			return { ...state, show: action.payload }
		default:
			return state
	}
}
