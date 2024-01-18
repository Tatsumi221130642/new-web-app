const express = require("express");
const routes = express.Router();
const authController = require("../../controllers/auth");
const usersController = require("../../controllers/users");
const authenticateToken = require("../../middleware/auth");

routes.post("/register", authController.register);
routes.post("/login", authController.login);
// routes.get("/:id", authenticateToken, usersController.userDetailByID);
module.exports = routes;
