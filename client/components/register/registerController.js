function RegisterController($scope, $location) {

    $scope.toLogin = function () {
        $location.path("/login");
    };
}

export default RegisterController;
