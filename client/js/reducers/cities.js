export default function (state = [], action) {
	switch (action.type) {
		case 'CREATE_CITIES':
			return { ...state, cities: action.cities };
		case 'LOAD_CITYES':
			return { ...state, cities: action.cities };
		default:
			return state
	}
}
