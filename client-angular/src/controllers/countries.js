class CountriesCtrl {
	constructor( $scope, $http ) {
                $http.get('http://localhost:3000/countries').then(( data ) => {
                        $scope.countries = data.data;
                })
                $scope.countries = [{id: 'no countries'}]
	}
}

CountriesCtrl.$inject = [ '$scope', '$http' ];

export default CountriesCtrl;