angular.module("app").controller("loginCtrl", function($scope, authService, $state) {
  $scope.user = {
  };
  $scope.demo = {
    email: 'demo@demo.com',
    password: 'demo'
  };
  $scope.login = function(user) {
    authService.login(user).then(function(response) {
      if (!response.data) {
        alert('User does not exist');
        $scope.user.password = '';
      } else {
        $state.go('boards');
      }
    }).catch(function(err) {
      alert('Unable to login');
    });
  };

  $scope.register = function(user) {
    authService.registerUser(user).then(function(response) {
      if (!response.data) {
        alert('Unable to create user');
      } else {
        alert('User Created, please login');
        $scope.newUser = {};
        $state.go('login');
      }
    }).catch(function(err) {
      alert('Unable to create user');
    });
  };
});
