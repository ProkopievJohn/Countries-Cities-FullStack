function Login(el) {
	if (!el) return;
	this.el = el;
	this.loginBtn = this.el.querySelector('#login');
	this.signupBtn = this.el.querySelector('#signup');
	this.name = this.el.querySelector('#name');
	this.password = this.el.querySelector('#password');
	this.user = this.el.querySelector('.user');
	this.events = new EventEmitter();
	this.init();
}

Login.prototype = {
	init: function () {
		this.el.addEventListener('click', this.delegationClick.bind(this));
	},

	delegationClick: function (e) {
		var target = e.target;

		if (target === this.loginBtn) {
			this.login();
		}

		if (target === this.signupBtn) {
			this.signup();
		}
	},

	clearInputs: function () {
		this.name.value = '';
		this.password.value = '';
	},

	login: function () {
		if (this.name.value === '' || this.password.value === '') return;
		this.emit('login', { name: this.name.value, password: this.password.value });
	},

	signup: function () {
		if (this.name.value === '' || this.password.value === '') return;
		this.emit('signup', { name: this.name.value, password: this.password.value });
	},

	showUser: function (text) {
		this.user.innerHTML = 'Hi, ' + text;
		this.user.classList.remove('hide');
		this.el.querySelector('.form-group').classList.add('hide');
	},

	hideUser: function () {
		this.user.classList.add('hide');
		this.el.querySelector('.form-group').classList.remove('hide');
	},

	emit: function (event, parameters) {
		this.events.emit(event, parameters);
	},

	on: function (event, listener) {
		this.events.on(event, listener);
	}
}