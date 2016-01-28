var noticesApp = angular.module('noticesApp', ['ngRoute']);
console.log('inside notices app');

noticesApp.run(function($rootScope){
   $rootScope.authenticated = false;
   $rootScope.current_user = '';
   console.log($rootScope.current_user);
});
noticesApp.config(function($routeProvider){
  $routeProvider
    //the timeline display
    .when('/', {
      templateUrl: 'notices.html',
      controller: 'mainController'
    })
    //the login display
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'authController'
    })
    //the signup display
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'authController'
    });
});

noticesApp.controller('mainController',['$scope', function($scope){
	$scope.notices = [];
	$scope.newNotice = {created_by: '', text: '', created_at: ''};
	

	$scope.post = function(){
		$scope.newNotice.created_at = Date.now();
		$scope.notices.push($scope.newNotice);
		$scope.newNotice = {created_by: '', text: '', created_at: ''};
		// $('#newIcon').css('animation','newEntry');

	};
}]);

noticesApp.controller('authController',['$scope', function($scope,$http,$rootScope,$location){
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';

	$scope.login = function(){
    	//placeholder until authentication is implemented
      
      $http.post('/auth/login', $scope.user).success(function(data){
        console.log('hello')
        if(data.state == 'success'){
          $rootScope.authenticated = true;
          $rootScope.current_user = data.user.username;
          location.path('/');
        }
        else {
          $scope.error_message = 'invalid login details';
        }
      });
    	
	};

	$scope.register = function(){
    	//placeholder until authentication is implemented
    	$scope.error_message = 'registeration request for ' + $scope.user.username;
	};
}]);