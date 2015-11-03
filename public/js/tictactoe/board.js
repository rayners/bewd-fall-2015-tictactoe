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
      // template: function() {
      //   return "/games/" + id + ".html";
      // },
      controller: 'BoardCtrl',
      controllerAs: 'vm',
      bindToController: true
    };
  });

angular.module('bewd.tictactoe.board').
  factory('boardService', ['$http', function($http) {
    return {
      getBoards: function() {
        // AJAX Request!
        return $http.get('/games').
          then(function(response) {
            return response.data;
          });
      },
      getBoard: function(id) {
        return $http.get('/games/' + id).
          then(function(response) {
            return response.data;
          });
      },
      updateBoard: function(id, board) {
        return $http.put('/games/' + id, { board: board }).
          then(function(response) {
            return response.data;
          });
      }
      // updateBoard7 = _.curry(updateBoard, 7);
      // updateBoard7(board);
    };
  }]).
  controller('BoardsController', BoardsController);

  BoardsController.$inject = ['boardService', '$interval', '$log', '$scope'];
  function BoardsController(boardService, $interval, $log, $scope) {
    var vm = this;

    var boardRefresher;
    vm.selectBoard = function selectBoard(board) {
      vm.selectedBoard = board;

      if (boardRefresher) {
        $interval.cancel(boardRefresher);
      }
      boardRefresher = $interval(function() {
        boardService.getBoard(board.id).then(function(b) {
          vm.selectedBoard = b;
        })
      }, 1000);
    };

    function loadBoards() {
      boardService.getBoards().then(function(boards) {
        $log.debug("Boards response is ", boards);
        vm.boards = boards;
      });
    }

    loadBoards();
    var boardLoader = $interval(loadBoards, 10000);
    $scope.$on('$destroy', function() {
      $interval.cancel(boardLoader);
    });
  }

angular.module('bewd.tictactoe.board')
  .controller('BoardController', function(boardObj) {
    this.theBoard = boardObj.board;
  });
