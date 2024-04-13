function RegisterController($scope, $location) {
    $scope.username = "";
	$scope.password = "";
    $scope.email="";
	$scope.errorMsg = "";


    $scope.register=function(){
        console.log($scope.username,$scope.password,$scope.email);
    }

    $scope.toLogin = function () {
        $location.path("/login");
    };
}

export default RegisterController;
