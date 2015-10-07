angular.module('bewd.tictactoe.board', []);

angular.module('bewd.tictactoe.board').
  controller('BoardCtrl', function() {
    this.makeYourMove = function makeYourMove() {
      this.theBoard[2][2] = 'Y';
    };
  }).
  directive('ticTacToeBoard', function() {
    return {
      scope: {
        theBoard: '='
      },
      restrict: 'E',
      templateUrl: '/public/tmpls/board.html',
      controller: 'BoardCtrl',
      controllerAs: 'vm',
      bindToController: true
    };
  });

angular.module('bewd.tictactoe.board').
  factory('boardService', ['$http', function($http) {
    return {
      getBoards: function() {
        return $http.get('/games').
          then(function(response) {
            return response.data;
          });
      }
    };
  }]).
  controller('BoardsController', ['boardService', '$interval', '$log', function(boardService, $interval, $log) {
    var vm = this;

    function loadBoards() {
      boardService.getBoards().then(function(boards) {
        $log.debug("Boards response is ", boards);
        vm.boards = boards;
      });
    }

    loadBoards();
    $interval(loadBoards, 10000);
  }]);
