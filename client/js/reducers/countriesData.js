export default function (state = [], action) {
	switch (action.type) {
		case 'LOAD_COUNTRIES_DATA':
			return { ...state, data: action.data };
		default:
			return state
	}
}
