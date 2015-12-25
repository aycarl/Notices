var app = angular.module('noticesApp', []);

app.controller('mainController', function($scope){
	$scope.notices = [];
	$scope.newNotice = {created_by: '', text: '', created_at: ''};
	

	$scope.post = function(){
		$scope.newNotice.created_at = Date.now();
		$scope.notices.push($scope.newNotice);
		$scope.newNotice = {created_by: '', text: '', created_at: ''};
		// $('#newIcon').css('animation','newEntry');

	};
});

app.controller('authController', function($scope){
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';

	$scope.login = function(){
    	//placeholder until authentication is implemented
    	$scope.error_message = 'login request for ' + $scope.user.username;
	};

	$scope.register = function(){
    	//placeholder until authentication is implemented
    	$scope.error_message = 'registeration request for ' + $scope.user.username;
	};
});