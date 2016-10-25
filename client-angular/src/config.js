import template from './section.tmp.html';

const config = ( $stateProvider, $urlRouterProvider, $httpProvider ) => {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state( 'index', {
            url: '/',
            template,
        })
}

config.$inject = [ '$stateProvider', '$urlRouterProvider', '$httpProvider' ];

export default config;
