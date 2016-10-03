function App() {
	this.url = 'data';
	this.countries = new Countries(document.querySelector('#countries'));
	this.cities = new Cities(document.querySelector('#cities'));
	this.resp = new Resp(document.querySelector('#response'));
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
	this.resp.on('resp-del', this.respDel.bind(this));
	this.XMLLoad('GET', this.url, this.addDatafromDatabase.bind(this));
};

App.prototype.addDatafromDatabase = function (data) {
	var data = JSON.parse(data);
	for (var i = 0; i < data.length; i++) {
		this.dataAddDo(data[i]);
	}
};

App.prototype.dataAddDo = function (data) {
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
	this.cities.chooseInList(response);
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
	this.countries.findInList(data.getAttribute('country-name'));
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
	this.XMLLoad('POST', '/add', this.apdateAllLists.bind(this), JSON.stringify(this.dataForServer), 'application/json');
};

App.prototype.respDel = function () {
	this.XMLLoad('POST', '/del', this.apdateAllLists.bind(this), JSON.stringify(this.dataForServer), 'application/json');
};

App.prototype.apdateAllLists = function (data) {
	this.resp.showData('');
	this.dataForServer = {};
	this.countries.elForAdd.value = '';
	this.countries.findInList('');
	this.cities.elForAdd.value = '';
	this.cities.findInList('');
	var data = JSON.parse(data);
	this.countries.clearAllList();
	this.cities.clearAllList();
	for (var i = 0; i < data.length; i++) {
		this.dataAddDo(data[i]);
	}
};

window.addEventListener('DOMContentLoaded', function(){
	new App();
});
