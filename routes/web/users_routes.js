const express = require("express");
const routes = express.Router();
const userController = require("../../controllers/users.js");
const auth = require("../../middleware/auth.js");

routes.get("/", userController.users);
routes.get(
  "/detail/:id",
  auth.authenticationToken,
  userController.getUserDetailById
);
routes.patch("/:id", auth.authenticationToken, userController.updateUser);

module.exports = routes;
