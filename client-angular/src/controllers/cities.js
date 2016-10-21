class Cities {
	constructor( $scope ) {
		$scope['selected-city'] = '';
		$scope.$watch('countries', ( newVal, oldVal ) => {
			const countries = $scope.countries;
			let cities = [];
			countries.forEach( ( item ) => {
				for ( let i = 0; i < item.cities.length; i++ ) {
					cities.push( { id: item.id, city: item.cities[i] } );
				}
			})
			$scope.cities = cities;
		})
		$scope.selectCity = ( city ) => {
			if ( $scope.search.city === city.city ) {
				$scope.search.city = '';
			} else {
				$scope.search.city = city.city;
				$scope.data.city = city.city;
			}
		}
		$scope.isSelectCity = ( city ) => {
			return $scope.search.city === city.city;
		}
		$scope.newCity = ( cityName ) => {
			const name = cityName[0].toUpperCase() + cityName.slice(1);
			$scope.data.city = name;
		}
	}
}

Cities.$inject = [ '$scope' ];

export default Cities;
