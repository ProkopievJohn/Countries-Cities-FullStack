function Cities(el) {
	if (!el) return;
	this.el = el;
	this.elToAdd = this.el.querySelector('#cities-list');
	this.elForAdd = this.el.querySelector('#city-input');
	this.elBtn = this.el.querySelector('#city-btn');
	this.events = new EventEmitter();
	this.init();
}

Cities.prototype = {
	init: function () {
		this.el.addEventListener('click', this.delegationClick.bind(this));
		this.el.addEventListener('keyup', this.delegationKeyup.bind(this));
	},

	delegationClick: function (e) {
		var target = e.target;

		if (target.tagName === 'LI') {
			this.enterCity(target);
		}

		if (target === this.elBtn) {
			this.createCity();
		}
	},

	delegationKeyup: function (e) {
		var target = e.target;

		this.findInList(this.elForAdd.value);
		if (e.keyCode === 13) {
			var el = this.elToAdd.querySelector('.show-list');
			this.enterCity(el);
		}
	},

	addCity: function (text, id) {
		if ((typeof text !== 'string' || text === '') && (typeof id !== 'string' || id === '')) return;
		this.elToAdd.insertAdjacentHTML('beforeend', '<li show country-name="' + id + '">' + text + '</li>');
	},

	clearAllList: function () {
		while (this.elToAdd.firstChild) {
			this.elToAdd.removeChild(this.elToAdd.firstChild);
		}
	},

	hideAll: function () {
		var els = this.elToAdd.children;
		for (var i = 0; i < els.length; i++) {
			els[i].classList.add('hide');
			els[i].classList.remove('show-list', 'selected');
		}
	},

	findInList: function (text) {
		!this.elForAdd.value ? this.elBtn.setAttribute('disabled', 'disabled') : this.elBtn.removeAttribute('disabled');
		
		var els = this.getByAttribute('show');
		this.hideAll();
		for (var i = 0; i < els.length; i++) {
			if (els[i].innerHTML.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
				els[i].classList.remove('hide');
				els[i].classList.add('show-list');
			}
		}
	},

	setAllShow: function () {
		var els = this.elToAdd.children;
		for (var i = 0; i < els.length; i++) {
			els[i].setAttribute('show', '');
		}
	},

	chooseInList: function (arr) {
		this.elBtn.setAttribute('disabled', 'disabled');
		this.hideAll();
		function helper(arr) {
			return function (el, i, array) {
				for (var i = 0; i < arr.length; i++) {
					if (el === arr[i].getAttribute('country-name')) {
						arr[i].classList.remove('hide');
						arr[i].classList.add('show-list');
						arr[i].setAttribute('show', '');
					} else {
						arr[i].removeAttribute('show');
					}
				}
			}
		}
		var els = this.elToAdd.children;
		arr.forEach(helper(els));
		this.elForAdd.setAttribute('disabled', 'disabled')
	},

	getByAttribute: function (attrName) {
		var response = [];
		var els = this.elToAdd.children;
		for (var i = 0; i < els.length; i++) {
			if (els[i].hasAttribute(attrName)) {
				response.push(els[i]);
			}
		}
		return response;
	},

	enterCity: function (el) {
		if (!el) {
			this.createCity();
			return;
		}
		this.unSelected();
		this.emit('city-enter', el);
		el.classList.add('selected');
	},

	unSelected: function () {
		var els = this.elToAdd.children;
		for (var i = 0; i < els.length; i++) {
			els[i].classList.remove('selected');
		}
	},

	startChooseCities: function (countryName) {
		// this.elForAdd.value = '';
		this.chooseInList([countryName]);
		this.elForAdd.removeAttribute('disabled')
		this.elForAdd.focus();
	},

	createCity: function () {
		if (this.elForAdd.value === '') return;
		this.emit('city-create', this.elForAdd.value);
	},

	emit: function (event, parameters) {
		this.events.emit(event, parameters);
	},

	on: function (event, listener) {
		this.events.on(event, listener);
	}
}

