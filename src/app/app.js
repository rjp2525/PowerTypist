var home        = require('./home/home'),
    type        = require('./type/type'),
    leaderboard = require('./leaderboard/leaderboard');

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
    'Type',
    'Leaderboard'
  ])
  .config([
    '$urlRouterProvider',
    '$stateProvider',
    config
  ]);

var words  = require('./services/words.js');
var scores = require('./services/scores.js');
