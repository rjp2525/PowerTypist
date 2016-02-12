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

},{"./home/home.js":2,"./type/type.js":3}],2:[function(require,module,exports){
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
function type() {

  var config = function($stateProvider) {
    $stateProvider
      .state('type', {
        url: '/type',
        controller: 'TypeController',
        controllerAs: 'vm',
        templateUrl: './dist/assets/views/type/type.html'
      });
  }

  var typeController = function() {
    var vm = this;

    var shuffleArray = function(array) {
      var m = array.length, t, i;

      while (m) {
        i = Math.floor(Math.random() * m--);

        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }

      return array;
    }

    vm.wordBank = [
      'hi', 'bye', 'this', 'he', 'were', 'who',
      'they', 'example', 'how', 'for', 'Indian',
      'American', 'truck', 'but', 'spin', 'hoop',
      'basketball', 'alcohol'
    ];

    vm.wordBank = shuffleArray(vm.wordBank);

    vm.onWord = 0;
    
    vm.correctWords = [];
    vm.incorrectWords = [];

    vm.checkWord = function(event) {
      if (event.keyCode === 32 || event.charCode === 32) {
        event.preventDefault();

        if ($('input').val() == vm.wordBank[vm.onWord]) {
          vm.correctWords.push(vm.onWord);
        } else {
          vm.incorrectWords.push(vm.onWord);
        }

        $('input').val('');
        vm.onWord += 1;
      }
    }
  }

  angular
    .module('Type', ['ui.router'])
    .config([
      '$stateProvider',
      config
    ])
    .controller('TypeController', [
      typeController
    ]);
}

module.exports = type();

},{}]},{},[1]);
