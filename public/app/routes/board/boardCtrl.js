angular.module("app")
    .controller("boardCtrl", function($scope, user, authService, userService, $stateParams, $state) {
        $scope.user = user;
        console.log($state.params);

        $scope.getBoard = function() {
            userService.getBoard($state.params.board_id).then(function(res) {
                $scope.currentBoard = res.data[0];
                console.log(res.data);
            });
        };

        $scope.getBoard();

        $scope.getLists = function() {
            console.log($stateParams);
            userService.getLists($state.params.board_id).then(function(res) {
                $scope.lists = res.data;
                console.log('test');
            });
        };
        $scope.getLists();

        $scope.createList = function(newList) {
            userService.createList(newList).then(function(res) {
                $scope.getLists();
            });
        };

        $scope.update={};
        $scope.dragStartCallback=function(list_id, list_position) {
            console.log(list_id);
            $scope.update.list_id=list_id;
            $scope.update.original_list_position = list_position;
        };
        $scope.dropCallback = function (index, item, external, type) {
            console.log('dropped at', index, external, type);
            console.log('item.position will be shifted 1 from', index);
            $scope.update.position=index;
            userService.updateLists($scope.update).then(function(res){
                $scope.getLists();
            });


        };
        $scope.updateCard={};
        $scope.cardCallback = function(drop_list_id) {
            console.log(drop_list_id);
        };
        $scope.newUser = {};
        $scope.addUser = function(newUser) {
            $scope.newUser.board_id = $state.params.board_id;
            userService.addUser(newUser).then(function(res) {
                $scope.getUsers($state.params.board_id);
            });
        };

        $scope.users=[];
        $scope.getUsers = function(board_id) {
            userService.getUsers(board_id).then(function(res) {
                $scope.users=res.data;
            });
        };
        $scope.getUsers($state.params.board_id);

        $scope.labels = [
            {name:'No Labels', color:'grey', isSelected: false},
            {name:'red', color:'red', isSelected: false},
            {name:'yellow', color:'yellow', isSelected: false},
            {name:'green', color:'green', isSelected: false}
        ];
        
        $scope.toggleLabel= function(label){
            for (let i=0; i<$scope.labels.length; i++){
                if ($scope.labels[i].name==label){
                    $scope.labels[i].isSelected=!$scope.labels[i].isSelected;
                }
            }
        }
    });
