export default function (state = [], action) {
	switch (action.type) {
		case 'ENTER_CITY':
			return { ...state, enterCity: action.payload };
		default:
			return state
	}
}
