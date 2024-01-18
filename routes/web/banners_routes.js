const express = require("express");
const routes = express.Router();
const bannerController = require("../../controllers/banners.js");

routes.get("/", bannerController.getAllBanners);

module.exports = routes;
