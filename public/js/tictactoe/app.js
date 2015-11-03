(function() {

  angular.module('bewd.tictactoe',
    ['bewd.tictactoe.board', 'bewd.tictactoe.registration', 'ngRoute'])
    .config(function($routeProvider) {
      $routeProvider.when('/login', {
        templateUrl: '/partials/login',
        controller: 'LoginController',
        controllerAs: 'vm'
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
    .run(function($rootScope, $location) {
      $rootScope.$on('$routeChangeStart', function(event, next, current) {
        console.log(next);
      });
        // if (going_to_login_and_already_logged_in)
        //   event.preventDefault();
        //   $location.path('/games');
        // }
    });
})();
