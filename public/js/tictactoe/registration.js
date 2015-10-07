// public/js/tictactoe/registration.js
(function() {
  angular.module('bewd.tictactoe.registration', ['ngMessages'])
    .directive('uniqueUsername', function($http, $q) {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
          ctrl.$asyncValidators.uniqueUsername = function(modelValue, viewValue) {
            return $q(function(resolve, reject) {
              $http({
                url: '/users/usernameExists',
                method: 'GET',
                params: { username: modelValue }
              }).then(function(response) {
                response.data ? reject() : resolve();
              });
            });
          }
        }
      }
    })
})();
