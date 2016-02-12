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
