angular.module('app').directive('listDir', function() {
    return {
        restrict: 'EA',
        templateUrl: './app/directives/list/listTmpl.html',
        controller: 'listCtrl',
        scope: {
        	list: '=',
        	query: '@',
        	labelquery: '@'
        }

    };
});
