function words() {
	var WordsService = function($q, $http) {
		var WordsService = {};

		WordsService.refresh = function(array) {
			var m = array.length, t, i;

			while (m) {
				i = Math.floor(Math.random() * m--);

				t = array[m];
				array[m] = array[i];
				array[i] = t;
			}

			return array;
		}

		WordsService.extend = function(array, num) {
			for (var i = 0; i < num; i ++) {
				var index = Math.floor(Math.random() * (array.length - 0));

				array.push(array[index]);
			}

			return WordsService.refresh(array);
		}

		WordsService.index = function() {
			var defer = $q.defer();

			$http.get('./dist/assets/scripts/words.json')
				.then(function(response) {
					var words = [];

					response.data.forEach(function(obj) {
						var word = obj.word;
						words.push(word);
					});

					defer.resolve(WordsService.refresh(words));
				}, function(response) {
					defer.reject('Words could not be loaded.');
				});

			return defer.promise;
		}

		return WordsService;
	}

	angular
		.module('PowerTypist')
		.factory('WordsService', [
			'$q',
			'$http',
			WordsService
		]);
}

module.exports = words();