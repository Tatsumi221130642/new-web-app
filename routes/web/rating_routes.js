const express = require("express");
const routes = express.Router();
const ratingController = require("../../controllers/ratings");
const auth = require("../../middleware/auth.js");

// route user
routes.get(
  "/user/:idUser",
  auth.authenticationToken,
  ratingController.getAllRatingByIdUser
);
routes.get(
  "/user/diulas/:idUser",
  auth.authenticationToken,
  ratingController.getAllRatingDiUlasByIdUser
);
routes.post(
  "/user/:idTransaksi",
  auth.authenticationToken,
  ratingController.createRatingUser
);
routes.post(
  "/change/:idTransaksi",
  auth.authenticationToken,
  ratingController.createRatingUser
);

// route mitra
routes.get(
  "/mitra/diulas/:idMitra",
  auth.authenticationToken,
  ratingController.getAllRatingDiUlasByMitra
);
routes.get(
  "/mitra/diulas/rate/:idMitra/:rate",
  auth.authenticationToken,
  ratingController.getAllRatingRateByMitra
);

module.exports = routes;
