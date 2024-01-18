const express = require("express");
const routes = express.Router();
const userRoutes = require("./web/users_routes.js");
const authRoutes = require("./web/auth_routes.js");
const bannerRoutes = require("./web/banners_routes.js");
const categoryRoutes = require("./web/categories_routes.js");
const videoRoutes = require("./web/videos_routes.js");
const addressRoutes = require("./web/address_routes.js");

routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);
routes.use("/banner", bannerRoutes);
routes.use("/category", categoryRoutes);
routes.use("/video", videoRoutes);
routes.use("/address", addressRoutes);

module.exports = routes;
