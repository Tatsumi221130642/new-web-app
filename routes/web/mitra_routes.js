const express = require("express");
const routes = express.Router();
const mitraController = require("../../controllers/mitra.js");
const auth = require("../../middleware/auth.js");
const upload = require("../../middleware/uploadSingleImage.js");
const uploadGallery = require("../../middleware/uploadGalleryImage.js");

routes.get(
  "/profil/:idUser",
  auth.authenticationToken,
  mitraController.getMitraProfilLayanan
);

routes.get("/profil/detail/:idMitra", mitraController.getDetailMitra);

routes.get(
  "/gallery/:idMitra",
  auth.authenticationToken,
  mitraController.getAllGalleriesMitra
);

routes.post(
  "/profil/:idUser",
  [upload.single("image"), auth.authenticationToken],
  mitraController.createMitraProfilLayanan
);

routes.patch(
  "/profil/:idUser",
  [upload.single("image"), auth.authenticationToken],
  mitraController.updateMitraProfilLayanan
);

routes.patch(
  "/profil/status/:idUser",
  auth.authenticationToken,
  mitraController.updateStatus
);

routes.post(
  "/gallery/:idMitra",
  [auth.authenticationToken, uploadGallery.array("image", undefined)],
  mitraController.postGalleriesMitra
);

routes.get("/list/:idCategory", mitraController.getAllMitraByIdCategory);

module.exports = routes;
