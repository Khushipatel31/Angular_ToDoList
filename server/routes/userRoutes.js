const express = require("express");
const router = express.Router();
const userController =require("../controller/userController")

// Home page route.
router.post("/login", userController.login);

router.post("/register", userController.register);

router.post("/task/new",userController.addNewTask)

console.log("route.js");
module.exports = router;
