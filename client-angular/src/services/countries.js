class Countries {
	constructor( $http ) {
		this.$http = $http;
	}

	getCountries() {
		return this.$http.get('http://localhost:3000/countries');
	}
}

Countries.$inject = [ '$http' ];

export default Countries;
