angular.module('app').controller('cardCtrl', function($uibModal, $state, $scope, userService){

$scope.getComments=function(card_id) {
	userService.getComments(card_id).then(function(res) {
		$scope.comments=res.data;
		$scope.commentsCount = $scope.comments.length;
		
	});
};

$scope.getComments($scope.card.card_id);
$scope.newComment={};
$scope.open = function () {
	$uibModal.open({
		templateUrl: './app/directives/card/cardModalTmpl.html',
		size: 'lg',
		scope: $scope,
		windowClass: 'modal-window'
	}).closed.then(function(){

	});
};
$scope.createComment = function(newComment) {
	$scope.newComment.card_id=$scope.card.card_id;
	userService.createComment(newComment).then(function(res) {
		$scope.getComments($scope.card.card_id);
		$scope.newComment.comment_content='';
	});
};
$scope.updateLabel = {};
$scope.addLabel = function(updateLabel) {
	$scope.updateLabel.card_id= $scope.card.card_id;
	userService.addLabel(updateLabel).then(function(res) {
		$scope.getCards($scope.card.list_id);
	});
};

$scope.getCards = function(list_id) {
		userService.getCards(list_id).then(function(res){
			$scope.cards=res.data;
			console.log('got cards for', list_id);
		});
	};
});