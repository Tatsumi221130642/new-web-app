const AddressController = require("../../controllers/address.js");
const express = require("express");
const routes = express.Router();
const auth = require("../../middleware/auth.js");

routes.get(
  "/:idUser",
  auth.authenticationToken,
  AddressController.getAllAddress
);

routes.get(
  "/detail/:idAddress",
  auth.authenticationToken,
  AddressController.getSingleAddressById
);

routes.patch(
  "/:idAddress",
  auth.authenticationToken,
  AddressController.updateAddressById
);

routes.post("/", auth.authenticationToken, AddressController.createAddress);
routes.delete(
  "/:idAddress",
  auth.authenticationToken,
  AddressController.deleteAddress
);

module.exports = routes;
