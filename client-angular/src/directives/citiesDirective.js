import template from './cities.tmp.html';
import controller from './citiesCtrl';

const cities = () => {
	return {
		restrict: 'E',
		bindings: {},
		template,
		controller,
	}
}

export default cities;