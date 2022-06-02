const { response } = require("express");
const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/usersControllers");

//route to register a new user
router.post("/register", userControllers.register);

//route to login an existing user
router.post("/login", userControllers.login);

module.exports = router;