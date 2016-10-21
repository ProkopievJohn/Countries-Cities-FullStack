class HeaderResponse {
	constructor( $http ) {
		this.$http = $http;
	}

	getCountries() {
		return this.$http.get('http://localhost:3000/countries');
	}
}

HeaderResponse.$inject = [ '$http' ];

export default HeaderResponse;
