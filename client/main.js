import angular from "angular";
import "angular-route";
const appModule = angular
    .module("toDoList", ["ngRoute"])
    .config(config);

config.$inject = ["$routeProvider"];
function config($routeProvider) {
    // $routeProvider
    // .when("/", { templateUrl: "/routes/login/login.html", controller: "loginController" })
    // .when("/signup", { templateUrl: "/routes/signup/signup.html", controller: "signupController" })
    // .when("/home", { templateUrl: "/routes/home/home.html" })
    // .when("/projects", { templateUrl: "/routes/projects/projects.html" })
    // .when("/error", { templateUrl: "/routes/error/error.html" })
    // .otherwise("/error");
}

appModule.controller("m", function ( $scope) {
    $scope.name="abd";
})