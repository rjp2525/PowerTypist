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
