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

  var typeController = function(words, WordsService, $timeout, ScoresService) {
    var vm = this;

    vm.wordBank = words;

    if (vm.wordBank.length <= 100) {
      vm.wordBank = WordsService.extend(vm.wordBank, 200);
    }

    var currentHeight = 0;

    vm.onWord = 0;
    vm.onChar = 0;

    vm.correctWords = [];
    vm.incorrectWords = [];
    vm.correctChars = 0;
    vm.incorrectChars = 0;

    vm.wordsPerMinute = 0;

    vm.counter = 60;
    var timeout = null;

    vm.gameOver = false;

    var timer = false;

    function endGame() {
      vm.wordsPerMinute = vm.correctWords.length;
      $('.input-group').hide();
      $('.panel-words').slideUp();
      vm.gameOver = true;
    }

    function checkWPM() {
      var secondsPassed = 60 - vm.counter;
      var rate = 60 / secondsPassed;

      vm.wordsPerMinute = Math.round(vm.correctWords.length * rate);
    }

    function onTimeout() {
      if (vm.counter == 0) {
        $timeout.cancel(timeout);
        timer = false;
        endGame();
        return;
      } else {

        vm.counter -= 1;
        timer = true;
        checkWPM();
        timeout = $timeout(onTimeout, 1000);
      }
    }

    function startTimer() {
      timeout = $timeout(onTimeout, 1000);
      timer = true;
    }

    function stopTimer() {
      vm.counter = 60;
      $timeout.cancel(timeout);
      timer = false;
    }

    vm.checkWord = function(event) {
      if (event.keyCode === 32 || event.charCode === 32) {
        event.preventDefault();

        var currentWord = $('.word-active').position().top;
        var nextWord = $('.word-next').position().top;

        if (currentWord < nextWord) {
          var top = $('.word-list').position().top;
          $('.word-list').css('top', top - 45 + 'px');
        }

        console.log(currentWord);

        if ($('input').val() == vm.wordBank[vm.onWord].substring(0, vm.wordBank[vm.onWord].length)) {
          vm.correctWords.push(vm.onWord);
        } else {
          vm.incorrectWords.push(vm.onWord);
        }

        $('input').val('');
        vm.onWord += 1;

      }

      vm.onChar ++;
    }

    vm.checkChar = function(event) {
      if (!timer) {
        startTimer();
      }

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
      vm.onChar = 0;
      vm.correctWords = [];
      vm.incorrectWords = [];
      vm.correctChars = 0;
      vm.incorrectChars = 0;
      vm.counter = 60;
      stopTimer();
      vm.wordsPerMinute = 0;
      vm.gameOver = false;

      $('input').css('background', 'white')
      $('input').removeAttr('disabled');
      $('input').val('');
      $('input').focus();
      $('.word-list').css('top', '5px');
      vm.wordBank = WordsService.refresh(vm.wordBank);
      $('.panel-words').slideDown();
    }

    vm.store = function() {
      var data = {name: vm.name, wpm: vm.wordsPerMinute};
      console.log(data);

      ScoresService.store(data)
        .then(function(response) {
          console.log(response);
          if (response.success) {
            console.log(response.data);
            vm.gameOver = false;
          }
        });
    }

    $(document).on('keydown', function(event) {
      if (event.which === 8 && !$(event.target).is('input', 'textarea')) {
        event.preventDefault();
      }
    });
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
      'ScoresService',
      typeController
    ]);
}

module.exports = type();
