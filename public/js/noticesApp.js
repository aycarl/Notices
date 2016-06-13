var noticesApp = angular.module('noticesApp', ['ngRoute', 'ngResource']).run(function($http, $rootScope){
  $rootScope.authenticated = false;
  console.log('user authenticated:', $rootScope.authenticated);
  $rootScope.current_user = '';

  $rootScope.logout = function(){
    $http.get('/auth/logout');
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
    $location.path('/');
  };

});

//displays in the browser console
console.log('inside notices app');

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

noticesApp.controller('mainController', ['$scope', '$http', function($scope, $http, postService){

  $http.get('js/data.json').success(function(data){
    $scope.notices = data;
    console.log('List of notices is beings accessed!');
  });

  //creating empty variables
  // $scope.notices = [];
  // $scope.newNotice = {created_by: '', text: '', created_at: ''};
  
  // postService.getAll().success(function(data){
  //   $scope.posts = data;
  // });
  // $scope.notices = postService.query();

  //making a post call to update the list
  // $scope.post = function(){

  //   $scope.newNotice.created_by = $rootScope.current_user;
  //   $scope.newNotice.created_at = Date.now();
  //   postService.save($scope.newNotice, function(){
  //     $scope.posts = postService.query();
  //     $scope.newNotice = {created_by: '', text: '', created_at: ''};
  //   });
    // $scope.newNotice.created_at = Date.now();
    // $scope.notices.push($scope.newNotice);
    // $scope.newNotice = {created_by: '', text: '', created_at: ''};
    // $('#newIcon').css('animation','newEntry');

  // };
}]);

// noticesApp.factory('postService', function($http){
//   var baseUrl = "/api/posts";
//   var factory = {};
//   factory.getAll = function(){
//     return $http.get(baseUrl);
//   };
//   return factory;
// });

noticesApp.factory('postService', function($resource){
  return $resource('/api/notices/:id');
});

noticesApp.controller('authController', function($scope, $http, $rootScope, $location){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';
  // $scope.user = {username: $scope.user.username, password: $scope.user.password};
  console.log($scope.user);

  $scope.login = function(){
    //test display in the console
    console.log('user authenticated:', $rootScope.authenticated);
    console.log('inside login function');

    $http.post('/auth/login', $scope.user).then(function(user){

      if(user.data.state == 'success'){
        $rootScope.authenticated = true;
        console.log('user authenticated:', $rootScope.authenticated);
        $rootScope.current_user = user.data.user;
        console.log(user);
        //text display in the console
        console.log('with current user: ', $rootScope.current_user);
        $scope.message = user.data.state;
        $location.path('/');
      }
      else{
        $scope.error_message = user.data.message;
      }
    });
  };

  $scope.register = function(){
    $http.post('/auth/signup', $scope.user).success(function(user){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = user.data.user;
        $scope.message = user.data.state;
        $location.path('/');
      }
      else{
        $scope.error_message = user.data.message;
      }
    });
  };
});