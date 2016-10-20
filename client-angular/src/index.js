import angular from 'angular';
import uiRouter from 'angular-ui-router';
import config from './config';
import * as controllers from './controllers';
import * as services from './services';
import * as directives from './directives';

angular.module('app', [uiRouter])
		.config(config)
		.controller( 'countriesCtrl', controllers.CountriesCtrl )
		.controller( 'initCtrl', controllers.InitCtrl )
		.service( 'countriesService', services.countriesService )
		.directive ( 'countriesDirective', directives.countriesDirective )
