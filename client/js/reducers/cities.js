export default function (state = [], action) {
	switch (action.type) {
		case 'LOAD_CITIES':
			return { ...state, cities: action.cities };
		default:
			return state
	}
}
