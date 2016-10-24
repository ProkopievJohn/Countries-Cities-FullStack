class Cities {
	constructor( $scope ) {
		$scope['selected-city'] = '';
		$scope.$watch('countries', ( newVal, oldVal ) => {
			const countries = $scope.countries;
			let cities = [];
			countries.forEach( ( item ) => {
				for ( let i = 0; i < item.cities.length; i++ ) {
					cities.push( { id: item.id, cities: item.cities[i] } );
				}
			})
			$scope.cities = cities;
		})
		$scope.selectCity = ( city ) => {
			if ( $scope.search.cities === city.cities ) {
				$scope.search.cities = '';
			} else {
				$scope.search.cities = city.cities;
				$scope.data.cities = city.cities;
			}
		}
		$scope.isSelectCity = ( city ) => {
			return $scope.search.cities === city.cities;
		}
		$scope.newCity = ( cityName ) => {
			const name = cityName[0].toUpperCase() + cityName.slice(1);
			$scope.data.cities = name;
		}
	}
}

Cities.$inject = [ '$scope' ];

export default Cities;
