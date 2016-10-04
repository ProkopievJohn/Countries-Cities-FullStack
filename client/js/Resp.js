function Resp(el) {
	if (!el) return;
	this.el = el;
	this.elToResp = this.el.querySelector('#data-for-response');
	this.addBtn = this.el.querySelector('#response-add-data');
	this.updateBtn = this.el.querySelector('#response-update-data');
	this.removeBtn = this.el.querySelector('#response-remove-data');
	this.clearBtn = this.el.querySelector('#response-clear-data');
	this.events = new EventEmitter();
	this.init();
}

Resp.prototype = {
	init: function () {
		this.el.addEventListener('click', this.delegationClick.bind(this));
	},

	delegationClick: function (e) {
		var target = e.target;

		if (target === this.addBtn) {
			this.emit('resp-add');
		}

		if (target === this.removeBtn) {
			this.emit('resp-del');
		}

		if (target === this.clearBtn) {
			this.emit('resp-clear');
		}

		if (target === this.updateBtn) {
			this.emit('resp-update');
		}
	},

	showData: function (text) {
		if (text === '') {
			text = 'country: ; city: ;';
		}
		this.elToResp.innerHTML = text;
	},

	checkBtns: function (trueOrFalse) {
		var disabled = {
			add: function() {
				this.addBtn.setAttribute('disabled', 'disabled');
				this.removeBtn.setAttribute('disabled', 'disabled');
				this.updateBtn.setAttribute('disabled', 'disabled');
			},
			remove: function() {
				this.addBtn.removeAttribute('disabled');
				this.removeBtn.removeAttribute('disabled');
				this.updateBtn.removeAttribute('disabled');
			}
		}

		trueOrFalse ? disabled.remove.call(this) : disabled.add.call(this);
	},

	emit: function (event, parameters) {
		this.events.emit(event, parameters);
	},

	on: function (event, listener) {
		this.events.on(event, listener);
	}
}

