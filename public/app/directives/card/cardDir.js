angular.module('app').directive('cardDir', function() {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/card/cardTmpl.html',
    controller: 'cardCtrl',
    scope:{
			card: '='
		}
  };
});
