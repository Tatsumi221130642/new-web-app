const express = require("express");
const routes = express.Router();
const userRoutes = require("./web/users_routes.js");
const authRoutes = require("./web/auth_routes.js");

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);

module.exports = routes;
