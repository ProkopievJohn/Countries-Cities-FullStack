import template from './counties.tmp.html';
import controller from './countriesCtrl';

const countries = () => {
	return {
		restrict: 'E',
		bindings: {},
		template,
		controller
	}
}

export default countries;