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
	this.countries.on('country-enter', this.countryEnter.bind(this));
	this.countries.on('country-create', this.countryCreate.bind(this));
	this.cities.on('city-enter', this.citiesEnter.bind(this));
	this.cities.on('city-create', this.citiesCreate.bind(this));
	this.resp.on('resp-clear', this.respClear.bind(this));
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
	this.dataForServer['country'] = text;
	this.sendToResp();
	this.cities.startChooseCities(this.dataForServer.country);
};

App.prototype.citiesCreate = function (text) {
	if (typeof text !== 'string' || text === '') return;
	var text = text[0].toUpperCase() + text.slice(1);
	if (this.dataForServer['country'] === undefined) {
		this.countries.elForAdd.focus();
		return;
	}
	this.dataForServer['city'] = text;
	this.sendToResp();
};

App.prototype.sendToResp = function () {
	var respText = '';
	for (var i in this.dataForServer) {
		respText += i + ': ' + this.dataForServer[i] + '; '
	}
	this.resp.showData(respText);
	this.resp.checkBtns(respText !== '');
};

App.prototype.countryEnter = function (data) {
	this.countryCreate(data.innerHTML);
};

App.prototype.citiesEnter = function (data) {
	this.citiesCreate(data.innerHTML)
};

App.prototype.respClear = function () {
	this.dataForServer = {};
	this.sendToResp();
};

window.addEventListener('DOMContentLoaded', function(){
	new App();
});
