export const countries = (state = 'SHOW_ALL_COUNTRIES', action) => {
	switch (action.type) {
		case 'FETCH_COUNTRIES':
			return { ...state, fetch: action.payload }
		case 'SHOW_COUNTRIES':
			return { ...state, show: action.payload }
		default:
			return state
	}
}

/* ========================================== */
const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
  case 'SET_VISIBILITY_FILTER':
    return action.filter;
  default:
    return state;
  }
}

// export function todos(state = [], action) {
//   switch (action.type) {
//   case 'ADD_TODO':
//     return [...state, {
//       text: action.text,
//       completed: false
//     }];
//   case COMPLETE_TODO:
//     return [
//       ...state.slice(0, action.index),
//       Object.assign({}, state[action.index], {
//         completed: true
//       }),
//       ...state.slice(action.index + 1)
//     ];
//   default:
//     return state;
//   }
// }