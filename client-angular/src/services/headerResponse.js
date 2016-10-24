class HeaderResponse {
	constructor( $http ) {
		this.$http = $http;
	}

	addNew( data, token ) {
		return this.$http.post( 'http://localhost:3000/countries', data, { headers: { 'Authorization': token } } );
	}

	updata( data, token ) {
		return this.$http.put( 'http://localhost:3000/countries', data, { headers: { 'Authorization': token } } );
	}

	remove( data, token ) {
		return this.$http({
			method: 'delete',
			url: 'http://localhost:3000/countries',
			data: data,
			headers: { 'Content-Type': 'application/json', 'Authorization': token }
		});
	}
}

HeaderResponse.$inject = [ '$http' ];

export default HeaderResponse;
