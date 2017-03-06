angular.module('app').controller('listCtrl', function($scope, authService, userService, $state){
	$scope.addCardForm = false;
	$scope.getCards = function(list_id) {
		userService.getCards(list_id).then(function(res){
			$scope.cards=res.data;
			console.log('got cards for', list_id);
		});
	};

	$scope.getCards($scope.list.list_id);

	// $scope.$watch('cards', function(){
	// 	console.log('cards has changed');
	// });

	$scope.newCard={};
	$scope.newCard.list_id=$scope.list.list_id;
	$scope.createCard = function(newCard) {
		userService.createCard(newCard).then(function(res) {
			console.log('creating card', newCard);
			$scope.getCards($scope.list.list_id);
		});
	};

	$scope.updateCard={};

	$scope.dragstartCallback = function(card_id, original_list_id, card_position){
		$scope.updateCard.card_id = card_id;
		$scope.updateCard.original_list_id = original_list_id;
		$scope.updateCard.original_card_position = card_position;
	};

	$scope.moved = function() {
		console.log('cardMoved');
	};

	$scope.onDrop = function (index, item){
		$scope.updateCard.list_id = index.list_id;
		$scope.updateCard.card_position = item;
		console.log($scope.updateCard);
		userService.updateCards($scope.updateCard).then(function(res) {
			// $scope.getCards($scope.updateCard.original_list_id);
			// $scope.getCards($scope.updateCard.list_id);

			// console.log('updated card and cards position');
			// userService.getCards(index.list_id).then(function(res) {
			// 	userService.getCards($scope.updateCard.source_list_id).then(function(res) {
			// 		console.log('refreshed lists');
			// 	});
			// });

				// $scope.getCards($scope.updateCard.original_list_id).then(function(res) {
				// $scope.getCards($scope.updateCard.list_id).then(function(res) {
				// 	$scope.$apply();
				// });
					
				// });
				$state.reload();
		});
		
	};


	
});