// class InitCtrl {
// 	constructor( $scope, countriesService ) {
// 		countriesService.getCountries.then(( data ) => {
// 			console.log(data)
// 				// $scope.countries = data.data;
// 		})
// 		$scope.countries = [{id: 'no countries'}]
// 	}
// }

class InitCtrl {
	constructor( $scope, $http ) {
		$http.get('http://localhost:3000/countries').then(( data ) => {
			console.log(data)
				// $scope.countries = data.data;
		})
		$scope.countries = [{id: 'no countries'}]
	}
}

InitCtrl.$inject = [ '$scope', '$http' ];
// InitCtrl.$inject = [ '$scope', 'countriesService' ];

export default InitCtrl;


// class CountriesCtrl {
// 	constructor( $scope, $http ) {
//                 $http.get('http://localhost:3000/countries').then(( data ) => {
//                         $scope.countries = data.data;
//                 })
//                 $scope.countries = [{id: 'no countries'}]
// 	}
// }
