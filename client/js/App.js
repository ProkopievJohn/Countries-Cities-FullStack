function App() {
	this.url = '/countries';
	this.countries = new Countries();
	this.cities = new Cities();
	this.resp = new Resp(document.querySelector('#response'));
	this.login = new Login(document.querySelector('#login-signup'));
	this.dataForServer = {};
	this.init();
}

App.prototype = Object.create(Helper.prototype);

App.prototype.init = function () {
	this.countries.on('choose-countries', this.chooseCountries.bind(this));
	this.countries.on('country-create', this.countryCreate.bind(this));
	this.cities.on('city-enter', this.citiesEnter.bind(this));
	this.cities.on('city-create', this.citiesCreate.bind(this));
	this.resp.on('resp-clear', this.respClear.bind(this));
	this.resp.on('resp-add', this.respAdd.bind(this));
	this.resp.on('resp-update', this.respUpdate.bind(this));
	this.resp.on('resp-del', this.respDel.bind(this));
	this.login.on('login', this.loginSend.bind(this));
	this.login.on('signup', this.signupSend.bind(this));
	this.XMLLoad('GET', this.url, this.addDatafromDatabase.bind(this));
	sessionStorage.setItem('token', '');

};

App.prototype.addDatafromDatabase = function (data) {
	var data = JSON.parse(data);
	for (var i = 0; i < data.length; i++) {
		this.helperAddDatafromDatabase(data[i]);
	}
};

App.prototype.helperAddDatafromDatabase = function (data) {
	this.countries.addCountry(data.id);
	var merged = data.cities;
	if (!merged) return;
	for (var i = 0; i < merged.length; i++) {
		this.cities.addCity(merged[i], data.id);
	}
};

App.prototype.chooseCountries = function (data) {
	var response = [];
	for (var i = 0; i < data.length; i++) {
		response.push(data[i].innerHTML)
	}
	this.cities.chooseInListShow(response);
};

App.prototype.countryCreate = function (text) {
	if (typeof text !== 'string' || text === '') return;
	var text = text[0].toUpperCase() + text.slice(1);
	this.dataForServer['id'] = text;
	this.sendToResp();
	this.cities.startChooseCities(this.dataForServer.id);
};

App.prototype.citiesCreate = function (text) {
	if (typeof text !== 'string' || text === '') return;
	var text = text[0].toUpperCase() + text.slice(1);
	if (this.dataForServer['id'] === undefined) {
		this.countries.elForAdd.focus();
		return;
	}
	this.dataForServer['cities'] = text;
	this.sendToResp();
};

App.prototype.sendToResp = function () {
	var respText = '';
	for (var i in this.dataForServer) {
		var j = i === 'id' ? 'country' : i;
		respText += j + ': ' + this.dataForServer[i] + '; '
	}
	this.resp.showData(respText);
	this.resp.checkBtns(respText !== '');
};

App.prototype.citiesEnter = function (data) {
	this.countryCreate(data.getAttribute('country-name'));
	this.citiesCreate(data.innerHTML)
};

App.prototype.respClear = function () {
	this.countries.elForAdd.value = '';
	this.countries.findInList('');
	this.cities.elForAdd.value = '';
	this.cities.setAllShow();
	this.cities.findInList('');
	this.dataForServer = {};
	this.sendToResp();
};

App.prototype.respAdd = function () {
	this.XMLLoad('POST', this.url, this.apdateAllLists.bind(this), JSON.stringify(this.dataForServer), 'application/json');
};

App.prototype.respUpdate = function () {
	this.XMLLoad('PUT', this.url, this.apdateAllLists.bind(this), JSON.stringify(this.dataForServer), 'application/json');
};

App.prototype.respDel = function () {
	this.XMLLoad('DELETE', this.url, this.apdateAllLists.bind(this), JSON.stringify(this.dataForServer), 'application/json');
};

App.prototype.apdateAllLists = function (data) {
	this.resp.showData('');
	this.dataForServer = {};
	this.countries.elForAdd.value = '';
	this.countries.findInList('');
	this.cities.elForAdd.value = '';
	this.cities.findInList('');
	var data = JSON.parse(data);
	if (data.success === false) {
		this.login.hideUser();
	} else {
		this.countries.clearAllList();
		this.cities.clearAllList();
		for (var i = 0; i < data.length; i++) {
			this.dataAddDo(data[i]);
		}
	}
};

App.prototype.loginSend = function (data) {
	this.XMLLoad('POST', '/login', this.getToken.bind(this), JSON.stringify(data), 'application/json');
};

App.prototype.signupSend = function (data) {
	this.XMLLoad('POST', '/signup', this.getToken.bind(this), JSON.stringify(data), 'application/json');
};

App.prototype.getToken = function (data) {
	var data = JSON.parse(data);
	console.log(data);
	if (data.success) {
		this.login.showUser(data.user.name);
		sessionStorage.setItem('token', data.token);
	} else {
		sessionStorage.setItem('token', '');
	}
}

window.addEventListener('DOMContentLoaded', function(){
	new App();
});
