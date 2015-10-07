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
