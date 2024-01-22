const TransaksiModel = require("../models/TransactionModel");
const { generateOrderNumber } = require("../utils");
const { generateInvoiceNumber } = require("../utils");

// User Biasa
const createTransaction = async (req, res) => {
  try {
    const { idUser } = req.params;
    const body = req.body;
    const keluhan = JSON.stringify(body.keluhan);
    const numberTransaction = generateOrderNumber();
    const result = await TransaksiModel.createTransaction(
      idUser,
      body.id_alamat,
      body.id_mitra,
      body.id_kategori,
      numberTransaction,
      keluhan,
      body
    );
    res.status(200).json({ message: "success", data: result });
    console.log(body, idUser);
  } catch (error) {
    throw error;
  }
};

const getAllTransactionByIdUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const result = await TransaksiModel.getAllTransactionByIdUser(idUser);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};
const getAllTransactionCancelByIdUser = async (req, res) => {
  try {
    const { idUser, status } = req.params;
    const result = await TransaksiModel.getAllTransactionStatusByIdUser(
      idUser,
      status
    );
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const getDetailTransactionByIdTransaction = async (req, res) => {
  try {
    const { idTransaksi } = req.params;
    const result = await TransaksiModel.getDetailTransactionByIdTransaction(
      idTransaksi
    );
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const cancelTransaction = async (req, res) => {
  try {
    const { idTransaksi } = req.params;
    const result = await TransaksiModel.cancelTransaction(idTransaksi);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const confirmTransaction = async (req, res) => {
  try {
    const { idTransaksi } = req.params;
    const result = await TransaksiModel.confirmTransaction(idTransaksi);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const finishTransaction = async (req, res) => {
  try {
    const { idTransaksi } = req.params;
    const result = await TransaksiModel.finishTransaction(idTransaksi);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};
const changeRatingStatus = async (req, res) => {
  try {
    const { idTransaksi } = req.params;
    const result = await TransaksiModel.changeRatingStatus(idTransaksi);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};
// Mitra
const getAllTransactionByIdMitra = async (req, res) => {
  try {
    const { idMitra } = req.params;
    const result = await TransaksiModel.getAllTransactionByIdMitra(idMitra);
    res.status(200).json({ message: "success mitra", data: result });
  } catch (error) {
    throw error;
  }
};
const getAllTransactionStatusByIdMitra = async (req, res) => {
  try {
    const { idMitra, status } = req.params;
    const result = await TransaksiModel.getAllTransactionStatusByIdMitra(
      idMitra,
      status
    );
    res.status(200).json({ message: "success mitra", data: result });
  } catch (error) {
    throw error;
  }
};

const createInvoice = async (req, res) => {
  try {
    const { idTransaksi } = req.params;
    const body = req.body;
    const numberInvoice = generateInvoiceNumber();
    const result = await TransaksiModel.createInvoice(
      idTransaksi,
      numberInvoice,
      body.total_tagihan
    );
    res.status(200).json({ message: "success", data: result });
    console.log(idTransaksi, body, numberInvoice);
  } catch (error) {
    throw error;
  }
};

const getInvoiceDetailByIdTransaksi = async (req, res) => {
  try {
    const { idTransaksi } = req.params;
    const result = await TransaksiModel.getInvoiceDetailByIdTransaksi(
      idTransaksi
    );
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const updateNominalInvoiceByIdTransaksi = async (req, res) => {
  try {
    const { idTransaksi } = req.params;
    const body = req.body;
    const result = await TransaksiModel.updateNominalInvoiceByIdTransaksi(
      body.total_tagihan,
      idTransaksi
    );
    res.status(200).json({ message: "success", data: result });
    console.log(idTransaksi, body);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTransaction,
  getAllTransactionByIdUser,
  getAllTransactionCancelByIdUser,
  getDetailTransactionByIdTransaction,
  cancelTransaction,
  getAllTransactionByIdMitra,
  getAllTransactionStatusByIdMitra,
  confirmTransaction,
  createInvoice,
  finishTransaction,
  getInvoiceDetailByIdTransaksi,
  updateNominalInvoiceByIdTransaksi,
  changeRatingStatus,
};
