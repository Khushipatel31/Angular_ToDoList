function DashboardController($scope, $location, $http) {
    $scope.tasks = [];
    $scope.checkTokenAndRedirect = function () {
        if (!localStorage.getItem("user")) {
            window.location.href = "/";
        }
    };

    $scope.fetchTasks = async function () {
        try {
            const response = await $http.post("http://localhost:3001/tasks", {
                id: localStorage.getItem("user"),
            });
            $scope.$apply(() => {
                $scope.errorMsg = "";
                $scope.tasks = response.data.tasks;
            });
            console.log($scope.tasks)
        } catch (error) {
            $scope.errorMsg = error.data.message;
        }
    };
    $scope.checkTokenAndRedirect();
    $scope.fetchTasks();
}

export default DashboardController;
