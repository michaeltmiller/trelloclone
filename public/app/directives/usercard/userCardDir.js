angular.module('app').directive('userCardDir', function() {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/usercard/userCardTmpl.html',
    controller: 'userCardCtrl',
    scope:{
    	username: '@'
    }
  };
});