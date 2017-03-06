angular.module("app")
    .controller("profileCtrl", function($scope, user, authService, userService) {
        $scope.user = user;
        $scope.boards;
        $scope.newBoard;        

        $scope.getBoards=function() {
        	userService.getBoards()
        	.then(function(response) {
        		console.log(response.data);
        		$scope.boards=response.data;
        	});
        };
        $scope.getBoards();

        $scope.createBoard=function(newBoard) {
        	userService.createBoard(newBoard).then(
        			function(response) {
        				console.log(response);
        				$scope.getBoards();
        			}
        		)
        }

        $scope.updateUser = function(user) {
            authService.editUser(user)
                .then(function(response) {
                    $scope.user = response.data;
                });
        };
    });
