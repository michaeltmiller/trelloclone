angular.module("app").controller("userCardCtrl", function($scope, authService, $state, userService) {
  
  $scope.initials = $scope.username.slice(0, 1).toUpperCase();
});
