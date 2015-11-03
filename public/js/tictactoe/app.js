(function() {

  angular.module('bewd.tictactoe',
    ['bewd.tictactoe.board', 'bewd.tictactoe.registration', 'ngRoute'])
    .config(function($routeProvider) {
      $routeProvider.when('/login', {
        templateUrl: '/partials/login'
      });
      $routeProvider.when('/game/wacky', {
        templateUrl: '/public/tmpls/board.html',
        controller: 'BoardController',
        controllerAs: 'vm',
        resolve: {
          boardObj: function() {
            return {
              board: [['A', 'B', 'C'], ['D', 'E', 'F'], ['X', 'Y', 'Z']]
            }
          }
        }
      });
      $routeProvider.when('/game/:id', {
        templateUrl: '/public/tmpls/board.html',
        controller: 'BoardController',
        controllerAs: 'vm',
        resolve: {
          boardObj: function($route, boardService) {
            return boardService.getBoard($route.current.params.id);
          }
        }
      });
    })
    .run(function($rootScope) {
      $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
        alert(rejection.data);
      })
    });
})();
