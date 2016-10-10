export default function (state = [], action) {
	switch (action.type) {
		case 'LOAD_COUNTRIES':
			return { ...state, countries: action.data.countries };
		case 'SET_COUNTRY':
			return { ...state, newCountry: action.newCountry }
		default:
			return state
	}
}
