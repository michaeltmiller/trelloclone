var app = angular.module("app", ['ui.router', 'dndLists', 'ui.bootstrap'])

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/boards");

	$stateProvider
		// .state('home', {
		// 	url: "/",
		// 	templateUrl: "./app/routes/home/homeTmpl.html",
		// 	controller: 'homeCtrl'
		// })
		.state('login', {
			url: '/login',
			templateUrl: './app/routes/login/loginTmpl.html',
			controller: 'loginCtrl'
		})
		.state('register', {
			url: '/register',
			templateUrl: './app/routes/register/register.html',
			controller: 'loginCtrl'
		})
		.state('boards', {
			url: '/boards',
			templateUrl: './app/routes/profile/profileTmpl.html',
			controller: 'profileCtrl',
			resolve: {
				user: function(authService, $state) {
					return authService.getCurrentUser()
						.then(function(response) {
							if (!response.data)
								$state.go('login');
							return response.data;
						})
						.catch(function(err) {
							$state.go('login');
						});
				}
			}
		})
		.state('board', {
			url: '/board/:board_id',
			templateUrl: './app/routes/board/boardTmpl.html',
			controller: 'boardCtrl',
			resolve: {
				user: function(authService, $state) {
					return authService.getCurrentUser()
						.then(function(response) {
							if (!response.data)
								$state.go('login');
							return response.data;
						})
						.catch(function(err) {
							$state.go('login');
						});
				}
			}
		});

});
