(function() {

  angular.module('bewd.tictactoe',
    ['bewd.tictactoe.board', 'bewd.tictactoe.registration', 'ngRoute'])
    .config(function($locationProvider, $routeProvider) {
      $locationProvider.html5Mode(true);
      $routeProvider.when('/login', {
        templateUrl: '/partials/login',
        controller: 'LoginController',
        controllerAs: 'vm',
        bindToController: true
      });
    })
    .run(function($rootScope) {
      $rootScope.$on('$routeChangeStart', function(event, next, current) {
        console.log(next);
      });
        // if (going_to_login_and_already_logged_in)
        //   event.preventDefault();
        //   $location.path('/games');
        // }
    });

    angular.module('bewd.tictactoe')
      .controller('LoginController', function($http, $location, $rootScope) {
        var vm = this;
        vm.tryToLogin = tryToLogin;

        function tryToLogin() {
          $http.post('/login', { username: vm.username, password: vm.password })
            .then(function() {
              $rootScope.isLoggedIn = true;
              $location.path('/games');
            })
            .catch(function(response) {
              console.log(response.data.errors);
            });
        }
      });
})();


// log(in|out)
