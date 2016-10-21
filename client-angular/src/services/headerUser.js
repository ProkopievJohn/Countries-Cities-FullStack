class HeaderUserService {
	constructor( $http ) {
		this.$http = $http;
	}

	getCountries() {
		return this.$http.get('http://localhost:3000/countries');
	}
}

HeaderUserService.$inject = [ '$http' ];

export default HeaderUserService;
