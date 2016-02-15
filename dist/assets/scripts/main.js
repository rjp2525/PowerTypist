(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var home = require('./home/home.js'),
    type = require('./type/type.js');

var config = function($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state('404', {
      url: '/404',
      templateUrl: './dist/assets/views/errors/404.html'
    });

  $urlRouterProvider
    .otherwise('404');
}

angular
  .module('PowerTypist', [
    'Home',
    'Type'
  ])
  .config([
    '$urlRouterProvider',
    '$stateProvider',
    config
  ]);

var words = require('./services/words.js');

},{"./home/home.js":2,"./services/words.js":3,"./type/type.js":4}],2:[function(require,module,exports){
function home() {

  var config = function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController',
        controllerAs: 'vm',
        templateUrl: './dist/assets/views/home/home.html'
      });
  }

  var homeController = function() {
    
  }

  angular
    .module('Home', ['ui.router'])
    .config([
      '$stateProvider',
      config
    ])
    .controller('HomeController', [

      homeController
    ]);
}

module.exports = home();

},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
function type() {

  var config = function($stateProvider) {
    $stateProvider
      .state('type', {
        url: '/type',
        controller: 'TypeController',
        controllerAs: 'vm',
        templateUrl: './dist/assets/views/type/type.html',
        resolve: {
          words: [
            'WordsService',
            function(WordsService) {
              return WordsService.index()
              .then(function(response) {
                return response;
              });
            }
          ]
        }
      });
  }

  var typeController = function(words, WordsService, $timeout) {
    var vm = this;

    vm.wordBank = words;

    if (vm.wordBank.length <= 100) {
      vm.wordBank = WordsService.extend(vm.wordBank, 200);
    }

    vm.onWord = 0;
    vm.onChar = 0;

    vm.correctWords = [];
    vm.incorrectWords = [];
    vm.correctChars = 0;
    vm.incorrectChars = 0;

    vm.wordsPerMinute = 0;

    vm.counter = 60;
    var timeout = null;

    var timer = false;

    function endGame() {
      vm.wordsPerMinute = vm.correctWords.length;
      $('input').css('background', '#eee');
      $('input').attr('disabled', '');
      $('.panel-words').slideUp();
    }

    function onTimeout() {
      if (vm.counter == 0) {
        $timeout.cancel(timeout);
        timer = false;
        endGame();
        return;
      } else {

        vm.counter -= 1;
        timer = true;
        timeout = $timeout(onTimeout, 1000);
      }
    }

    function startTimer() {
      timeout = $timeout(onTimeout, 1000);
      timer = true;
    }

    function stopTimer() {
      vm.counter = 60;
      $timeout.cancel(timeout);
      timer = false;
    }

    vm.checkWord = function(event) {
      if (event.keyCode === 32 || event.charCode === 32) {
        event.preventDefault();

        if ($('input').val() == vm.wordBank[vm.onWord].substring(0, vm.wordBank[vm.onWord].length)) {
          vm.correctWords.push(vm.onWord);
        } else {
          vm.incorrectWords.push(vm.onWord);
        }

        console.log($('input').val());

        $('input').val('');
        vm.onWord += 1;

      }

      vm.onChar ++;
    }

    vm.checkChar = function(event) {
      if (!timer) {
        startTimer();
      }

      if (event.keyCode != 32 && event.charCode != 32) {
        if ($('input').val() == vm.wordBank[vm.onWord].substring(0, $('input').val().length)) {
          vm.correctChars += 1;
          $('input').css("background", "white");
        } else {
          vm.incorrectChars += 1;
          $('input').css("background", "red");
        }
      }
    }

    vm.refresh = function() {
      vm.onWord = 0;
      vm.onChar = 0;
      vm.correctWords = [];
      vm.incorrectWords = [];
      vm.correctChars = 0;
      vm.incorrectChars = 0;
      vm.counter = 60;
      stopTimer();
      vm.wordsPerMinute = 0;

      $('input').css('background', 'white')
      $('input').removeAttr('disabled');
      $('input').val('');
      $('input').focus();
      vm.wordBank = WordsService.refresh(vm.wordBank);
      $('.panel-words').slideDown();
    }

    $(document).on('keydown', function(event) {
      if (event.which === 8 && !$(event.target).is('input', 'textarea')) {
        event.preventDefault();
      }
    });
  }

  angular
    .module('Type', ['ui.router'])
    .config([
      '$stateProvider',
      config
    ])
    .controller('TypeController', [
      'words',
      'WordsService',
      '$timeout',
      typeController
    ]);
}

module.exports = type();

},{}]},{},[1]);
