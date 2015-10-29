describe('BoardController', function() {
  // this tells angular to automatically load the
  // bewd.tictactoe.board module
  beforeEach(module('bewd.tictactoe.board'));

  // the inject function handles the passed function
  // by tying it into angular's injection mechanisms
  it('should load the board for the current route', inject(function($controller) {
    // $controller is used to create an instance of the controller
    // the second parameter we can use to override what the controller
    // is expecting from angular
    var boardController = $controller('BoardController', { boardObj: { board:[['X', 'X', 'X'], [ 'O', 'O', 'O' ], ['X', 'O', 'X' ]]}});

    // And check that the request result was properly handled
    boardController.theBoard.should.to.deep.equal([['X', 'X', 'X'], [ 'O', 'O', 'O' ], ['X', 'O', 'X' ]]);
  }));
});
