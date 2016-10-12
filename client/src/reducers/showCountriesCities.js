export default function (state = [], action) {
	switch (action.type) {
		case 'SHOW_COUNTRIES_CITIES':
			return { ...state, showCountriesCities: action.payload };
		default:
			return state
	}
}
