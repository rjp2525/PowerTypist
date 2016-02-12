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

    vm.message = 'hi';

    vm.wordBank = [
      'hello', 'this', 'is', 'an', 'example', 'but',
      'who', 'what', 'they', 'he', 'her', 'their',
      'there', 'when', 'American', 'truck',
      'how', 'often', 'did', 'word', 'come',
      'up'
    ];

    vm.onWord = 0;
    vm.correctWords = [0];

    vm.checkWord = function(event) {
      if (event.keyCode === 32 || event.charCode === 32) {
        event.preventDefault();

        if ($('input').val() == vm.wordBank[vm.onWord]) {
          vm.wordBank[vm.onWord] = 'CORRECT';
        } else {
          vm.wordBank[vm.onWord] = 'ERROR';
        }

        $('input').val('');
        vm.correctWords.push(vm.wordOn);
        vm.onWord += 1;
        vm.wordBank = vm.wordBank;
        console.log(vm.onWord);
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
