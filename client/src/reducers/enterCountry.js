export default function (state = [], action) {
	switch (action.type) {
		case 'ENTER_COUNTRY':
			return { ...state, enterCountry: action.payload };
		default:
			return state
	}
}
