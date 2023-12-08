var express = require("express");
var router = express.Router();
var userController = require("../../controllers/userController");

//post method
//this fn user for create user
//http://localhost:4000/api/user/create
router.post("/create", userController.createUser);

module.exports = router;