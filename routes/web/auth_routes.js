const express = require("express");
const routes = express.Router();
const authController = require("../../controllers/auth");
const usersController = require("../../controllers/users");
const authenticateToken = require("../../middleware/auth");

routes.post("/register", authController.register);
routes.post("/login", authController.login);
// routes.get("/:id", authenticateToken, usersController.userDetailByID);
routes.delete("/logout/:id", authController.logout);
module.exports = routes;
