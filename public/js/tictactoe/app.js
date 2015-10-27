(function() {

  angular.module('bewd.tictactoe', ['bewd.tictactoe.board', 'bewd.tictactoe.registration', 'ngRoute'])
    .config(function($routeProvider) {
      $routeProvider.when('/game/:id', {
        templateUrl: '/public/tmpls/board.html',
        controller: 'BoardController',
        controllerAs: 'vm'
      });
    });

})();
