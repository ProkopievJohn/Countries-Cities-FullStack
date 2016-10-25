import angular from 'angular';
import uiRouter from 'angular-ui-router';
import config from './config';
import * as services from './services';
import * as directives from './directives';
import * as filters from './filters';

angular.module('app', [uiRouter])
		.config(config)

		.directive( 'countriesDirective', directives.countries )
		.directive( 'citiesDirective', directives.cities )
		.directive( 'headerUserDirective', directives.headerUser )
		.directive( 'headerResponseDirective', directives.headerResponse )

		.service( 'countriesService', services.Countries )
		.service( 'headerResponseService', services.HeaderResponse )
		.service( 'headerUserService', services.HeaderUser )
		.service( 'sessionService', services.Session )
		
		.filter( 'searchCountries', filters.countries )
		.filter( 'searchCities', filters.cities )

