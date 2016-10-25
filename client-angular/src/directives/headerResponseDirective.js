import template from './header.response.tmp.html';
import controller from './headerResponseCtrl';

const headerResponse = () => {
	return {
		restrict: 'E',
		bindings: {},
		template,
		controller,
	}
}

export default headerResponse;
