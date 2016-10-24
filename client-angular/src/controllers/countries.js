class Countries {
	constructor( $scope, countriesService ) {
		$scope.countries = [{id: 'no countries', cities: ['no cities'] }];
		$scope.data = { id: '', cities: '' };
		$scope.search = { id: '', cities: '' };
		countriesService.getCountries().then(( data ) => {
			$scope.countries = data.data;
		})
		$scope.selectCountry = ( country ) => {
			if ($scope.search.id === country.id) {
				$scope.search.id = '';
			} else {
				$scope.search.id = country.id;
				$scope.data.id = country.id;
			}
		}
		$scope.isSelectCountry = ( country ) => {
			return $scope.search.id === country.id;
		}
		$scope.newCountry = ( countryName ) => {
			const name = countryName[0].toUpperCase() + countryName.slice(1);
			$scope.data.id = name;
		}
	}
}

Countries.$inject = [ '$scope', 'countriesService' ];

export default Countries;
