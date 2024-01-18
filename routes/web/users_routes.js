const express = require("express");
const routes = express.Router();
const userController = require("../../controllers/users.js");
const auth = require("../../middleware/auth.js");
const upload = require("../../middleware/uploadSingleImage.js");

routes.get("/", userController.users);
routes.get(
  "/detail/:id",
  auth.authenticationToken,
  userController.getUserDetailById
);
routes.patch("/:id", userController.updateUser);
routes.patch(
  "/image/single/:id",
  [upload.single("image")],
  userController.updateImageByUserId
);

module.exports = routes;
