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
      vm.correctWords = [];
      vm.incorrectWords = [];
      vm.counter = 60;
      vm.wordsPerMinute = 0;
      vm.timer;

      $('input').val('');
      $('input').focus();
      vm.wordBank = WordsService.refresh(vm.wordBank);
    }
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
