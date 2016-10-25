class HeaderUser {
	constructor( $scope, headerUserService, sessionService, $http ) {
		$scope.isSuccess = () => {
			const storUser = JSON.parse( sessionService.get( 'user' ) ); 
			if ( storUser !== null ) {
				$scope.user = storUser;
				$http.defaults.headers.common.Authorization = 'Bearer ' + storUser.token;
			}
			return $scope.user === undefined ? false : $scope.user.success ? true : false;
		}

		$scope.login = ( logUser ) => {
			headerUserService.login( logUser ).then( ( data ) => {
				if ( data.data.success ) {
					sessionService.set( 'user', JSON.stringify( data.data ) );
					$http.defaults.headers.common.Authorization = 'Bearer ' + data.data.token;
				} else {
					console.log( data.data );
				}
			})
		}

		$scope.signup = ( logUser ) => {
			headerUserService.signup( logUser ).then( ( data ) => {
				if ( data.data.success ) {
					sessionService.set( 'user', JSON.stringify( data.data ) );
					$http.defaults.headers.common.Authorization = 'Bearer ' + data.data.token;
				} else {
					console.log( data.data );
				}
			})
		}

		$scope.logout = () => {
			$scope.user = undefined;
			sessionService.remove( 'user' );
			$http.defaults.headers.common.Authorization = '';
		}
	}
}

HeaderUser.$inject = [ '$scope', 'headerUserService', 'sessionService', '$http' ];

export default HeaderUser;
