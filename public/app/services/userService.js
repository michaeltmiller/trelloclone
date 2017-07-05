angular.module("app")
	.service("userService", function($http) {
		this.getBoards= function() {
			return $http({
				method: 'GET',
				url: '/api/boards'
			});
		};

		this.getBoard = function(board_id) {
			return $http({
				method: 'GET',
				url: '/api/board/'+ board_id
			});
		};

		this.getLists= function(id){
			console.log(id);
			return $http ({
				method: 'GET',
				url: '/api/lists/' + id
			});
		};
		this.getCards = function(id) {
			return $http ({
				method: 'GET',
				url: '/api/cards/' + id
			});
		};
		this.getComments = function(id) {
			return $http ({
				method: 'GET',
				url: '/api/comments/' + id
			});
		};

		this.createCard = function(newCard) {
			return $http ({
				method: 'POST',
				url: '/api/card',
				data: newCard
			});
		};
		this.createList = function(newList) {
			return $http ({
				method: 'POST',
				url: 'api/list',
				data: newList
			});
		};
		this.createBoard = function(newBoard) {
			return $http ({
					method: 'POST',
					url: '/api/board',
					data: newBoard
				});
		};
		this.createComment = function(newComment) {
			return $http ({
				method: 'POST',
				url: '/api/comment',
				data: newComment
			});
		};
		this.getUsers = function() {
			return $http ({
				method: 'GET',
				url: '/api/user'
			});
		};

		this.getUser = function(id) {
			return $http ({
				method: 'GET',
				url: '/api/user?id=' + id
			});
		};

		this.updateLists=function(update) {
			return $http ({
				method: 'PUT',
				url: '/api/list',
				data: update
			});
		};

		this.updateCards = function(updateCard) {
			return $http ({
				method: 'PUT',
				url: '/api/cards',
				data: updateCard
			});
		};

		this.addLabel = function(updateLabel) {
			return $http ({
				method: 'POST',
				url: '/api/label',
				data: updateLabel
			});
		};

		this.addUser = function(newUser) {
			return $http ({
				method: 'POST',
				url: '/api/user',
				data: newUser
			});
		};

		this.getUsers = function(board_id) {
			return $http ({
				method: 'GET',
				url: '/api/users/' + board_id
			});
		};
	});
