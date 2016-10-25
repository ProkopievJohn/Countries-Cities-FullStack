import template from './header.user.tmp.html';
import controller from './headerUserCtrl.js';

const headerUser = () => {
	return {
		restrict: 'E',
		bindings: {},
		template,
		controller,
	}
}

export default headerUser;