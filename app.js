
var app = angular.module("myApp",["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl: './pages/login.html',
            controller: 'loginCtrl'
        })
        .when("/login",{
            templateUrl: './pages/login.html',
            controller: 'loginCtrl'
        })
        .when("/list",{
            templateUrl: './pages/listpage.html',
            controller: 'tableCtrl'
        })
        .when("/edit",{
            templateUrl: './pages/edit.html',
            controller: 'editCtrl'
        })
        .when("/add",{
            templateUrl: './pages/newemp.html',
            controller:'addCtrl'
        });
});




app.controller('loginCtrl',function($scope){
    //$scope.myemail = '';
    //$scope.mypwd = '';
    $scope.login = {
        email: '',
        pwd: ''
    };

    $scope.register = function () {
        window.location.href = "#!add";
    };

    $scope.processlogin=function(){
        if($scope.login.email.length != 0 && $scope.login.pwd.length != 0) {
            window.location.href = "#!list";
            console.log('Login clicked');
        }else {
            alert('Please enter email and password!');
        }
    }
});


app.factory("myService",function($http){
    return {
        getData:function(){
            return $http.get("data.json");
        }

    };
});

app.service('sharedService',function () {
    this.emp = {};
    this.employees = [];
    this.currentNum = 0;
});

/*var obj= {
    name: "sweta",
    id: 7,

    display: function () {
        alert(this.name);
    }
};
*/


app.controller("tableCtrl",function($scope,myService, sharedService){

    myService.getData().then(function(response){
        if(sharedService.employees.length > 0) {
            $scope.data = sharedService.employees;
        }else {
            $scope.data = response.data;
            sharedService.employees = response.data;
        }
    });
    $scope.options = ['Id','Name','Age'];
    $scope.sortBy = $scope.options[0];

    $scope.getSortBy = function () {
        if($scope.sortBy == 'Name') {
            return 'lastname';
        }else if($scope.sortBy == 'Age') {
            return 'age';
        }  else if($scope.sortBy== 'Id'){
            return 'id';
        }
    };

    $scope.gotoAddNew = function () {
        window.location.href = "#!add";
    };

    $scope.editClicked = function (num) {
        //alert('Hii '+num);
        sharedService.employees = $scope.data;
        sharedService.emp = $scope.data[num];
        sharedService.currentNum = num;
        window.location.href="#!edit";
    };
});

app.controller("editCtrl",function($scope,sharedService){
    $scope.currentEmp = sharedService.emp;
    var crntNum = sharedService.currentNum;
    $scope.saveEmp=function(){
        sharedService.employees[crntNum] = $scope.currentEmp;
        window.location.href = "#!list";
    };
});

app.controller("addCtrl",function($scope, sharedService){
    $scope.newEmp = {};

    $scope.addEmp = function () {
        sharedService.employees.push($scope.newEmp);
        window.location.href = "#!list";
    };

});