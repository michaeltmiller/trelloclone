angular.module("app").controller("navCtrl", function($scope, authService, $state) {
  $scope.logout = function() {
    authService.logout().then(function(response) {
      $state.go('login');
    });
  };

  // $scope.state = $state;


  // $scope.getUserNav = function() {
  // 	authService.getCurrentUser().then(function(res) {
  // 		$scope.username = res.data[0];
  // 		console.log('navCtrl', $scope.username);
  // 	});
  // };

  // $scope.getUserNav();


});
