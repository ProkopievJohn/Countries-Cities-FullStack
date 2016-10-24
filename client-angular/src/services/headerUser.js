class HeaderUserService {
	constructor( $http ) {
		this.$http = $http;
	}

	login( user ) {
		return this.$http.post( 'http://localhost:3000/login', user );
	}

	signup( user ) {
		return this.$http.post( 'http://localhost:3000/signup', user );
	}
}

HeaderUserService.$inject = [ '$http' ];

export default HeaderUserService;
