class HeaderResponse {
	constructor( $http ) {
		this.$http = $http;
	}

	addNew( data ) {
		return this.$http.post( 'http://localhost:3000/countries', data );
	}

	updata( data ) {
		return this.$http.put( 'http://localhost:3000/countries', data );
	}

	remove( data ) {
		return this.$http({
			method: 'delete',
			url: 'http://localhost:3000/countries',
			data: data,
			headers: { 'Content-Type': 'application/json' }
		});
	}

}

HeaderResponse.$inject = [ '$http' ];

export default HeaderResponse;
