import angular from 'angular';
import uiRouter from 'angular-ui-router';
import config from './config';
import * as controllers from './controllers';
import * as services from './services';
import * as directives from './directives';
import * as filters from './filters';

angular.module('app', [uiRouter])
		.config(config)

		.directive( 'countriesDirective', directives.countries )
		.directive( 'citiesDirective', directives.cities )
		.directive( 'userHeaderDirective', directives.headerUser )
		.directive( 'headerResponseDirective', directives.headerResponse )
		
		.controller( 'citiesCtrl', controllers.Cities )
		.controller( 'countriesCtrl', controllers.Countries )
		.controller( 'headerResponseCtrl', controllers.HeaderResponse )
		.controller( 'headerUserCtrl', controllers.HeaderUser )
		
		.service( 'countriesService', services.Countries )
		.service( 'headerResponseService', services.HeaderResponse )
		.service( 'headerUserService', services.HeaderUser )
		
		.filter( 'searchCountries', filters.countries )
		.filter( 'searchCities', filters.cities )
