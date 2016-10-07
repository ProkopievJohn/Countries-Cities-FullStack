const middlewere = store => next => action => {
	if (action.then) {

	}

	return next(action);
}

export default middlewere;
