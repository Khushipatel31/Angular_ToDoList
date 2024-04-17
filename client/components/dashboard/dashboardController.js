function DashboardController($scope, $location,$http,$filter) {
    $scope.tasks = [];
    $scope.errorMsg = "";
    $scope.message = "";
    $scope.editTask = {};
    $scope.currentDate = $filter('date')(new Date(), 'MMMM d, yyyy');
    console.log($scope.currentDate)
    $scope.checkTokenAndRedirect = function () {
        if (!localStorage.getItem("user")) {
            window.location.href = "/";
        }
    };

    $scope.addNewTask = async function (task, userId) {
        try {
            const response = await $http.post("http://localhost:3001/task/new", {
                userId,
                task,
            });
            $scope.$apply(() => {
                $scope.errorMsg = "";
                $scope.tasks = response.data.tasks.filter(
                    (task) => task.status === true
                );
                $scope.message = response.data.message;
            });
        } catch (error) {
            $scope.errorMsg = error.data.message;
        }
    };

    $scope.openModal = function (t) {
        $scope.editTask = t;
        $scope.taskk = t.task;
        $scope.editTask.userId = localStorage.getItem("user");

        document.getElementById("editTaskModal").style.display = "block"; 
    };

    $scope.closeModal = function () {
        document.getElementById("editTaskModal").style.display = "none"; 
    };

    $scope.saveEditedTask = function () {
        $scope.editTask.task = $scope.taskk;
        $scope.toggleEdit($scope.editTask);
        $scope.closeModal();
    };

    $scope.addTask = function () {
        if (!$scope.newTask.trim() || !localStorage.getItem("user")) {
            $scope.errorMsg = "Please enter properly";
            return;
        }
        $scope.addNewTask($scope.newTask, localStorage.getItem("user"));
    };

    $scope.removeTask=function(t){
        $scope.editTask=t;
        $scope.editTask.userId=localStorage.getItem('user');
        $scope.editTask.status="false";
        $scope.toggleEdit();
    }

    $scope.toggleEdit = async function () {
        try {
            const response = await $http.post("http://localhost:3001/task/update", $scope.editTask);
            $scope.$apply(() => {
                $scope.errorMsg = "";
                $scope.tasks = response.data.tasks.filter(
                    (task) => task.status === true
                );
            });
        } catch (error) {
            $scope.errorMsg = error.data.message;
        }
    };

    $scope.fetchTasks = async function () {
        try {
            const response = await $http.post("http://localhost:3001/tasks", {
                id: localStorage.getItem("user"),
            });
            $scope.$apply(() => {
                $scope.errorMsg = "";
                $scope.tasks = response.data.tasks.filter(
                    (task) => task.status === true
                );
            });
        } catch (error) {
            $scope.errorMsg = error.data.message;
        }
    };
    $scope.checkTokenAndRedirect();
    $scope.fetchTasks();
}

export default DashboardController;
