function scores() {
	var ScoresService = function($q, $http) {
		var ScoresService = {};
		var API = 'http://45.63.18.172:8080/';

		ScoresService.index = function() {
			var defer = $q.defer();

			$http.get(API + 'scores')
				.then(function(response) {
					return defer.resolve(response.data);
				}, function(response) {
					return defer.reject('Whoops! Something went wrong!');
				});

			return defer.promise;
		}

		ScoresService.store = function(data) {
			var defer = $q.defer();

			$http.post(API + 'scores', data)
				.then(function(response) {
					return defer.resolve(response.data);
				}, function(response) {
					return defer.reject('Whoops! Something went wrong!');
				});

			return defer.promise;
		}

		return ScoresService;
	}

	angular
		.module('PowerTypist')
		.factory('ScoresService', [
			'$q',
			'$http',
			ScoresService
		]);
}

module.exports = scores();