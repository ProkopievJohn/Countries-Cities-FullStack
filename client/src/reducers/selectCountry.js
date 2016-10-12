export default function (state = [], action) {
	switch (action.type) {
		case 'SELECT_COUNTRY':
			return { ...state, selectCountry: action.payload };
		default:
			return state
	}
}
