const express = require("express");
const routes = express.Router();
const userController = require("../../controllers/users.js");
const authController = require("../../controllers/auth.js");
const auth = require("../../middleware/auth.js");

routes.get("/", userController.users);
routes.post("/", userController.register);
routes.get(
  "/detail/:id",
  auth.authenticationToken,
  userController.getUserDetailById
);
routes.patch("/:id", auth.authenticationToken, userController.updateUser);
routes.delete("/:id", userController.logout);

module.exports = routes;
