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
