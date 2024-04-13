function LoginController($scope, $location) {
    $scope.username = "";
	$scope.password = "";
	$scope.errorMsg = "";

    $scope.login = function () {
        // Implement login logic here
        console.log('Logging in with:', $scope.password,$scope.username);
    };

    $scope.toSignup = function () {
        console.log("H");
        $location.path("register");
    };
}

export default LoginController;
