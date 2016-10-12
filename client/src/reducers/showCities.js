export default function (state = [], action) {
	switch (action.type) {
		case 'SHOW_CITIES':
			return { ...state, showCities: action.payload };
		default:
			return state
	}
}
