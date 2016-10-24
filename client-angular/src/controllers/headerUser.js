class HeaderUser {
	constructor( $scope, headerUserService, sessionService ) {
		$scope.isSuccess = () => {
			const storUser = JSON.parse( sessionService.get( 'user' ) ); 
			if ( storUser !== null ) {
				$scope.user = storUser;
			}
			return $scope.user === undefined ? false : $scope.user.success ? true : false;
		}

		$scope.login = ( logUser ) => {
			headerUserService.login( logUser ).then( ( data ) => {
				if ( data.data.success ) {
					sessionService.set( 'user', JSON.stringify( data.data ) );
				} else {
					console.log( data.data );
				}
			})
		}

		$scope.signup = ( logUser ) => {
			headerUserService.signup( logUser ).then( ( data ) => {
				if ( data.data.success ) {
					sessionService.set( 'user', JSON.stringify( data.data ) );
				} else {
					console.log( data.data );
				}
			})
		}

		$scope.logout = () => {
			$scope.user = undefined;
			sessionService.remove( 'user' );
		}
	}
}

HeaderUser.$inject = [ '$scope', 'headerUserService', 'sessionService' ];

export default HeaderUser;
