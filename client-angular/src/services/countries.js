// app.service('productsService', ['$http', 'sessionService', function($http, sessionService){
// 	'use strict';
// 	this.products = function(){
// 		return $http.get('http://smktesting.herokuapp.com/api/products/')
// 	};
// 	this.comments = function(id) {
// 		return $http.get('http://smktesting.herokuapp.com/api/reviews/' + id)
// 	};
// 	this.mycomment = function(id, comment){
// 		return $http.post('http://smktesting.herokuapp.com//api/reviews/' + id, comment, {headers: {'Authorization': 'Token ' + sessionService.get('user')}});
// 	}
// }]);

const countriesService = ( $http ) => {
	this.getCountries = () => {
		return $http.get('http://localhost:3000/countries');
	};
}

countriesService.$inject = [ '$http' ];

export default countriesService;
