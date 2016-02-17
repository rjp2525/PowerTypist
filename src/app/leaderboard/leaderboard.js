function leaderboard() {
 	var config = function($stateProvider) {
 		$stateProvider
 			.state('leaderboard', {
 				url: '/leaderboard',
 				controller: 'LeaderboardController',
 				controllerAs: 'vm',
 				templateUrl: './dist/assets/views/leaderboard/leaderboard.html',
 				resolve: {
 					leaderboard: [
 						'ScoresService',
 						function(ScoresService) {
 							return ScoresService.index()
 							.then(function(response) {
 								return response;
 							});
 						}
 					]
 				}
 			});
 	}

 	var leaderboardController = function(leaderboard) {
 		var vm = this;
 		vm.leaderboard = leaderboard;
 	}

 	angular
 		.module('Leaderboard', ['ui.router'])
 		.config([
 			'$stateProvider',
 			config
 		])
 		.controller('LeaderboardController', [
 			'leaderboard',
 			leaderboardController
 		]);
}

module.exports = leaderboard();