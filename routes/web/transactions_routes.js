const express = require("express");
const routes = express.Router();
const transactionController = require("../../controllers/transactions");
const auth = require("../../middleware/auth.js");

routes.post(
  "/:idUser",
  auth.authenticationToken,
  transactionController.createTransaction
);

routes.get(
  "/:idUser",
  auth.authenticationToken,
  transactionController.getAllTransactionByIdUser
);

routes.get(
  "/detail/transaction/:idTransaksi",
  auth.authenticationToken,
  transactionController.getDetailTransactionByIdTransaction
);

routes.get(
  "/:idUser/:status",
  auth.authenticationToken,
  transactionController.getAllTransactionCancelByIdUser
);

routes.patch(
  "/cancel/:idTransaksi",
  auth.authenticationToken,
  transactionController.cancelTransaction
);
routes.patch(
  "/confirm/:idTransaksi",
  auth.authenticationToken,
  transactionController.confirmTransaction
);
routes.patch(
  "/finish/:idTransaksi",
  auth.authenticationToken,
  transactionController.finishTransaction
);

routes.patch(
  "/rating/finish/:idTransaksi",
  auth.authenticationToken,
  transactionController.changeRatingStatus
);

// Mitra
routes.get(
  "/mitra/all/:idMitra",
  auth.authenticationToken,
  transactionController.getAllTransactionByIdMitra
);
routes.get(
  "/mitra/all/:idMitra/:status",
  auth.authenticationToken,
  transactionController.getAllTransactionStatusByIdMitra
);

routes.post(
  "/mitra/:idTransaksi",
  auth.authenticationToken,
  transactionController.createInvoice
);

routes.get(
  "/invoice/detail/:idTransaksi",
  auth.authenticationToken,
  transactionController.getInvoiceDetailByIdTransaksi
);

routes.patch(
  "/invoice/nominal/:idTransaksi",
  auth.authenticationToken,
  transactionController.updateNominalInvoiceByIdTransaksi
);
module.exports = routes;
