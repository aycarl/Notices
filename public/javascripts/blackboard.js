
var myApp=angular.module('board',[]); 
myApp.controller('controls',function($scope){

    var community;
	var ashesi;


	community=function(){
     var headline;
     var newsbody;
  


	}
	
	
	ashesi=function(){
	 var calender;
	 var period;
     var newsbody;
	
	
	}
	

	community.headline="mid semesters approaching";
    community.newsbody="the Mid-Semester examinations....";
    $scope.theWords="royalty and loyalty";
    
	 ashesi.calender="Finals";
	 ashesi.period="next week";
	 ashesi.newsbody="seasongs greeting seasons closing";




$scope.community=community;
$scope.ashesi=ashesi;
});



