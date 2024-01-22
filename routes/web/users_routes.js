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
routes.patch(
  "/username/:idUser",
  auth.authenticationToken,
  userController.updateUsernameById
);
routes.patch(
  "/no-telp/:idUser",
  auth.authenticationToken,
  userController.updateNoTelpById
);
routes.patch(
  "/email/:idUser",
  auth.authenticationToken,
  userController.updateEmailById
);
routes.patch(
  "/password/:idUser",
  auth.authenticationToken,
  userController.updatePasswordById
);

module.exports = routes;
