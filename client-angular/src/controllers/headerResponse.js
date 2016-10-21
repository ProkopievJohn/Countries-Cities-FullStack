class HeaderResponse {
	constructor( $scope, headerResponseService ) {
        $scope.checkAddBtn = () => {
			if (!$scope.data || $scope.data.id === '') return true;
			let check = false;
			for ( let i = 0; i < $scope.countries.length; i++) {
				if ( $scope.countries[i].id === $scope.data.id ) check = true;
			}
			return check;
		}
		$scope.checkUpdateBtn = () => {
			if (!$scope.data || $scope.data.id === '' || $scope.data.city === '') return true;
			let check = true;
			$scope.countries.forEach( ( item ) => {
				if ( item.id === $scope.data.id ) {
					check = false;
					for ( let i = 0; i < item.cities.length; i++ ) {
						if ( item.cities[i] === $scope.data.city ) check = true;
					}
				}
			})
			return check;
		}
		$scope.checkRemoveBtn = () => {
			if (!$scope.data || $scope.data.id === '') return true;
			let check = true;
			$scope.countries.forEach( ( item ) => {
				if ( item.id === $scope.data.id ) {
					check = false;
					if ( $scope.data.city !== '' ) {
						check = true;
						for ( let i = 0; i < item.cities.length; i++ ) {
							if ( item.cities[i] === $scope.data.city ) check = false;
						}
					}
				}
			})
			return check;
		}
	}
}

HeaderResponse.$inject = [ '$scope', 'headerResponseService' ];

export default HeaderResponse;
