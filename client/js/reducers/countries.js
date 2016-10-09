export default function (state = [], action) {
	switch (action.type) {
		case 'LOAD_COUNTRIES':
			return { ...state, countries: action.countries };
		case 'SET_COUNTRY':
			return { ...state, countries: action.countries };
		default:
			return state
	}
}
