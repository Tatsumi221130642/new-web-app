const express = require("express");
const routes = express.Router();
const videoController = require("../../controllers/videos.js");

routes.get("/", videoController.getAllVideos);

module.exports = routes;
