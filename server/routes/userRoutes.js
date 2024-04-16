const express = require("express");
const router = express.Router();
const userController =require("../controller/userController")

router.post("/login", userController.login);

router.post("/register", userController.register);

router.post("/task/new",userController.addNewTask)

router.post("/tasks",userController.getTasks)

router.post("/task/update",userController.updateTask)

module.exports = router;
