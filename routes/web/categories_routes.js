const express = require("express");
const routes = express.Router();
const categoryController = require("../../controllers/categories.js");

routes.get("/", categoryController.getAllCategories);

module.exports = routes;
