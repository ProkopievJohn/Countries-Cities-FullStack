function Cities() {
	this.el = document.querySelector('#cities');
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
			this.selectCity(target);
		}

		if (target === this.elBtn) {
			this.selectCity();
		}
	},

	delegationKeyup: function (e) {
		var target = e.target;

		this.findInList(this.elForAdd.value);
		if (e.keyCode === 13) {
			var el = this.elToAdd.querySelector('.show-list');
			this.selectCity(el);
		}
	},

	selectCity: function (elOrText) {
		var cityName = !elOrText ? this.elForAdd.value : elOrText.innerHTML;
		this.removeAllSelect();
		if (!!elOrText) elOrText.classList.add('selected');
		this.emit('city-select', cityName);
	},

	removeAllSelect: function () {
		var els = this.elToAdd.children;
		for (var i = 0; i < els.length; i++) {
			els[i].classList.remove('selected');
		}
	},

	addCity: function (text, id) {
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
		this.activeDeactiveBtn(text !== '');
		var els = this.getByAttribute('show');
		this.hideAll();
		for (var i = 0; i < els.length; i++) {
			if (els[i].innerHTML.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
				els[i].classList.remove('hide');
				els[i].classList.add('show-list');
			}
		}
		var allShow = this.elToAdd.querySelectorAll('.show-list');
		this.emit('list-select-cities', allShow);
	},

	activeDeactiveBtn: function (trueOrFalse) {
		trueOrFalse ? this.elBtn.removeAttribute('disabled') : this.elBtn.setAttribute('disabled', 'disabled');
	},

	setAllShow: function () {
		var els = this.elToAdd.children;
		for (var i = 0; i < els.length; i++) {
			els[i].setAttribute('show', '');
		}
	},

	chooseInListShow: function (arr) {
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

