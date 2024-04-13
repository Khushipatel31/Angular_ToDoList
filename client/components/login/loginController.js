function LoginController($scope, $location) {
    $scope.loginData = {};

    $scope.login = function () {
        // Implement login logic here
        console.log('Logging in with:', $scope.loginData);
    };

    $scope.toSignup = function () {
        console.log("H");
        $location.path("register");
    };
}

export default LoginController;
