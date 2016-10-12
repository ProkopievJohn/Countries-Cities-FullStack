export default function (state = '', action) {
	switch (action.type) {
		case 'SELECT_CITY':
			return { ...state, selectCity: action.payload };
		default:
			return state
	}
}
