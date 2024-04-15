function RegisterController($scope, $location, $http) {
    $scope.username = "";
    $scope.password = "";
    $scope.email = "";
    $scope.errorMsg = "";

    $scope.validateForm = function () {
        $scope.errorMsg = ""; 

        if (!$scope.username || $scope.username.length < 5) {
            $scope.errorMsg = "Username must be at least 5 characters long.";
            return false; 
        }

        if (!$scope.password || $scope.password.length < 9) {
            $scope.errorMsg = "Password must be at least 9 characters long.";
            return false; 
        }

        if (!$scope.email || !isValidEmail($scope.email)) {
            $scope.errorMsg = "Invalid email format.";
            return false; 
        }

        return true; 
    };

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function sendDataToServer(data) {
        try {
            const response = await $http.post('http://localhost:3001/register', data);
            console.log("Success:", response.data);
            $scope.errorMsg = "";
            $location.path('/login');
        } catch (error) {
            console.log("Error:", error.data.message);
            $scope.errorMsg = error.data.message;
        }
    }

    $scope.register = function () {
        if ($scope.validateForm()) {
            let data = {
                username: $scope.username,
                password: $scope.password,
                email: $scope.email
            };
            sendDataToServer(data);
        }
    }

    $scope.toLogin = function () {
        $location.path("/login");
    };
}

export default RegisterController;
