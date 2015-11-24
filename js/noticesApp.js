var app = angular.module('noticesApp', []);

app.controller('mainController', function($scope){
	$scope.notices = [];
	$scope.newNotice = {created_by: '', text: '', created_at: ''};

	$scope.post = function(){
		$scope.newNotice.created_at = Date.now();
		$scope.notices.push($scope.newNotice);
		$scope.newNotice = {created_by: '', text: '', created_at: ''};
	};
});