const config = ( $stateProvider, $urlRouterProvider ) => {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state( 'index', {
            url: '/',
            templateUrl: '../views/section.tmp.html',
        })
}

config.$inject = [ '$stateProvider', '$urlRouterProvider' ];

export default config;