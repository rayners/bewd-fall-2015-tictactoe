describe('BoardController', function() {
  // this tells angular to automatically load the
  // bewd.tictactoe.board module
  beforeEach(module('bewd.tictactoe.board'));

  // the inject function handles the passed function
  // by tying it into angular's injection mechanisms
  it('should load the board for the current route', inject(function($controller, $httpBackend) {
    // this instructs angular to handle a GET request for the given url
    // with the given response
    $httpBackend.whenGET('/games/1').respond(200, { board: [['X', 'X', 'X'], [ 'O', 'O', 'O' ], ['X', 'O', 'X' ]] });

    // $controller is used to create an instance of the controller
    // the second parameter we can use to override what the controller
    // is expecting from angular
    var boardController = $controller('BoardController', { $routeParams: { id: 1 }});

    // make all the requests resolve themselves
    $httpBackend.flush();

    // And check that the request result was properly handled
    boardController.theBoard.should.deep.equal([['X', 'X', 'X'], [ 'O', 'O', 'O' ], ['X', 'O', 'X' ]]);
  }));
});
