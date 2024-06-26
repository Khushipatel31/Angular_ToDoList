import angular from 'angular';
import 'angular-route';
import loginCtrl from './components/login/loginController';
import registerCtrl from './components/register/registerController';
import dashboardCtrl from './components/dashboard/dashboardController';

const app = angular.module('ToDoList', ["ngRoute"]);
app.config(config);

config.$inject = ["$routeProvider", "$locationProvider","$httpProvider","$filterProvider"];
function config($routeProvider, $locationProvider, $httpProvider,$filterProvider) { 
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            redirectTo: '/login'
        })
        .when('/login', {
            templateUrl: 'components/login/login.html',
            controller: 'LoginController',
        })
        .when('/register', {
            templateUrl: 'components/register/register.html',
            controller: 'RegisterController',
        })
        .when('/tasks', {
            templateUrl: 'components/dashboard/dashboard.html',
            controller: 'DashboardController',
        })
};

app.controller('LoginController', loginCtrl);
app.controller('RegisterController', registerCtrl);
app.controller('DashboardController', dashboardCtrl);

loginCtrl.$inject = ["$scope", "$location","$http"];
registerCtrl.$inject = ["$scope", "$location","$http"];
dashboardCtrl.$inject = ["$scope", "$location","$http","$filter"];