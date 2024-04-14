const express = require("express");
const router = express.Router();
const userController =require("../controller/userController")

// Home page route.
router.get("/login", userController.login);

router.post("/register", userController.register);

console.log("route.js");
module.exports = router;
