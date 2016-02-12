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

  var typeController = function($timeout) {
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

    if (vm.wordBank.length < 120) {
      for (var i = 0; i < 120; i ++) {
        vm.wordBank.push(vm.wordBank[i]);
      }

      shuffleArray(vm.wordBank);
    }

    vm.onWord = 0;

    vm.correctWords = [];
    vm.incorrectWords = [];

    vm.wordsPerMinute = 0;

    vm.counter = 60;

    function endGame() {
      vm.wordsPerMinute = vm.correctWords.length;
    }

    vm.timer = function() {
      if (vm.counter != 0) {
        vm.counter --;
        timeout = $timeout(vm.timer, 1000);
      } else {
        endGame();
      }
    }

    var timeout = $timeout(vm.timer, 1000);

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

    vm.refresh = function() {
      vm.onWord = 0;
      vm.correctWords = [];
      vm.incorrectWords = [];
      vm.counter = 60;
      vm.wordsPerMinute = 0;

      $('input').val('');
      $('input').focus();
      vm.wordBank = shuffleArray(vm.wordBank);
    }
  }

  angular
    .module('Type', ['ui.router'])
    .config([
      '$stateProvider',
      config
    ])
    .controller('TypeController', [
      '$timeout',
      typeController
    ]);
}

module.exports = type();
