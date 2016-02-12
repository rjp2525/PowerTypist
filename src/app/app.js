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
