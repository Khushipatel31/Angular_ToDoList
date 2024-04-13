function DashboardController($scope, $location) {
    $scope.loginData = {};

    $scope.login = function () {
        // Implement login logic here
        console.log('Logging in with:', $scope.loginData);
    };

    $scope.toSignup = function () {
        $location.path("/register");
    };
}

export default DashboardController;
