function LoginController($scope, $location, $http) {
  $scope.email = "";
  $scope.password = "";
  $scope.errorMsg = "";
  $scope.loading = "";

  $scope.checkTokenAndRedirect = function () {
    if (localStorage.getItem("user")) {
      window.location.href = "/tasks";
    }
  }
  window.onload = function () {
    checkTokenAndRedirect();
  };
  $scope.checkTokenAndRedirect();
  $scope.validateForm = function () {
    $scope.errorMsg = "";

    if (!$scope.password || $scope.password.length < 8) {
      $scope.errorMsg = "Password must be at least 8 characters long.";
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

  $scope.login = function () {
    if ($scope.validateForm()) {
      let data = {
        password: $scope.password,
        email: $scope.email,
      };
      sendDataToServer(data);
    }
  };

  async function sendDataToServer(data) {
    try {
      $scope.loading = "Logging in... pLease wait"
      const response = await $http.post("http://localhost:3001/login", data);
      $scope.errorMsg = "";
      console.log(response);
      localStorage.setItem("user", response.data.userId);
      window.location.href = "/tasks";
    } catch (error) {
      $scope.$apply(() => {
        $scope.errorMsg = error.data.message;
        $scope.loading = "";
      });
    }
  }

  $scope.toSignup = function () {
    $location.path("/register");
  };
}

export default LoginController;
