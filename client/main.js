import angular from 'angular';
import 'angular-route';

import loginCtrl from './components/login/loginController';
import registerCtrl from './components/register/registerController';
// import dashboardCtrl from './components/dashboard/dashboardController';

const app = angular.module('abc', ["ngRoute"]);
app.config(config);

config.$inject = ["$routeProvider", "$locationProvider","$httpProvider"];
function config($routeProvider, $locationProvider) {
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
        // .when('/dashboard', {
        //     templateUrl: 'components/dashboard/dashboard.html',
        //     controller: 'dashboardController',
        // })
};

app.controller('LoginController', loginCtrl);
app.controller('RegisterController', registerCtrl);
// app.controller('DashboardController', dashboardCtrl);

loginCtrl.$inject = ["$scope", "$location","$http"];
registerCtrl.$inject = ["$scope", "$location","$http"];
// export default app.name;
