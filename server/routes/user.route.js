var express = require("express");
var router = express.Router();

var UserController = require("../controllers/user.controller");

router.post("/signup", UserController.adduser);
router.post("/login", UserController.login);
router.post("/users", UserController.users);
router.post("/updateUser", UserController.updateUser);
router.post("/search", UserController.searchUser)
module.exports = router;


// ? user related routes like:getting users, updating users, sending mails to users etc...