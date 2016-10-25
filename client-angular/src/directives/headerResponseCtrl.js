class HeaderResponse {
	constructor( $scope, headerResponseService, sessionService ) {
        $scope.checkAddBtn = () => {
			const user = JSON.parse( sessionService.get( 'user' ) );
			if ( !$scope.data || $scope.data.id === '' || !user ) return true;
			let check = false;
			for ( let i = 0; i < $scope.countries.length; i++) {
				if ( $scope.countries[i].id === $scope.data.id ) check = true;
			}
			return check;
		}

		$scope.checkUpdateBtn = () => {
			const user = JSON.parse( sessionService.get( 'user' ) );
			if (!$scope.data || $scope.data.id === '' || $scope.data.cities === '' || !user ) return true;
			let check = true;
			$scope.countries.forEach( ( item ) => {
				if ( item.id === $scope.data.id ) {
					check = false;
					for ( let i = 0; i < item.cities.length; i++ ) {
						if ( item.cities[i] === $scope.data.cities ) check = true;
					}
				}
			})
			return check;
		}

		$scope.checkRemoveBtn = () => {
			const user = JSON.parse( sessionService.get( 'user' ) );
			if (!$scope.data || $scope.data.id === '' || !user ) return true;
			let check = true;
			$scope.countries.forEach( ( item ) => {
				if ( item.id === $scope.data.id ) {
					check = false;
					if ( $scope.data.cities !== '' ) {
						check = true;
						for ( let i = 0; i < item.cities.length; i++ ) {
							if ( item.cities[i] === $scope.data.cities ) check = false;
						}
					}
				}
			})
			return check;
		}

		$scope.addNew = ( data ) => {
			const user = JSON.parse( sessionService.get( 'user' ) );
			const req = data.cities.trim().length === 0 ? { id: data.id } : data;
			if ( user === undefined ) return;
			headerResponseService.addNew( req ).then( ( data ) => {
				if ( typeof data.data === 'object' ) {
					$scope.countries = data.data;
					$scope.search = { id: '', cities: '' };
					$scope.data = { id: '', cities: '' };
				} else {
					console.log( data.data );
				}
			})
		}

		$scope.updata = ( data ) => {
			const user = JSON.parse( sessionService.get( 'user' ) );
			if ( user === undefined ) return;
			headerResponseService.updata( data ).then( ( data ) => {
				if ( typeof data.data === 'object' ) {
					$scope.countries = data.data;
					$scope.search = { id: '', cities: '' };
					$scope.data = { id: '', cities: '' };
				} else {
					console.log( data.data );
				}
			})
		}

		$scope.remove = ( data ) => {
			const user = JSON.parse( sessionService.get( 'user' ) );
			if ( user === undefined ) return;
			headerResponseService.remove( data ).then( ( data ) => {
				if ( typeof data.data === 'object' ) {
					$scope.countries = data.data;
					$scope.search = { id: '', cities: '' };
					$scope.data = { id: '', cities: '' };
				} else {
					console.log( data.data );
				}
			})
		}
	}
}

HeaderResponse.$inject = [ '$scope', 'headerResponseService', 'sessionService' ];

export default HeaderResponse;
