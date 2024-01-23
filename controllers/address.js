const AddressModel = require("../models/AddressModel.js");

const getAllAddress = async (req, res) => {
  try {
    const { idUser } = req.params;
    const result = await AddressModel.getAllAddress(idUser);
    res.json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const getSingleAddressById = async (req, res) => {
  try {
    const { idAddress } = req.params;
    const result = await AddressModel.getSingleAddressById(idAddress);
    res.json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const updateAddressById = async (req, res) => {
  try {
    const { idAddress } = req.params;
    const body = req.body;
    const result = await AddressModel.updateAddressById(body, idAddress);
    res.json({ message: "success" });
  } catch (error) {
    throw error;
  }
};

const createAddress = async (req, res) => {
  try {
    const body = req.body;
    const result = await AddressModel.createAddress(body);
    res.json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const deleteAddress = async (req, res) => {
  try {
    const body = req.body;
    const { idAddress } = req.params;
    const result = await AddressModel.deleteAddress(body, idAddress);
    res.json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAddress,
  getSingleAddressById,
  updateAddressById,
  createAddress,
  deleteAddress,
};
