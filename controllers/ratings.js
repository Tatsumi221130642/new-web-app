const RatingModel = require("../models/RatingModel");

const getAllRatingByIdUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const result = await RatingModel.getAllRatingByIdUser(idUser);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};
const getAllRatingDiUlasByIdUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const result = await RatingModel.getAllRatingDiUlasByIdUser(idUser);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const createRatingUser = async (req, res) => {
  try {
    const { idTransaksi } = req.params;
    const body = req.body;
    const result = await RatingModel.createRatingUser(idTransaksi, body);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const getAllRatingDiUlasByMitra = async (req, res) => {
  try {
    const { idMitra } = req.params;
    const result = await RatingModel.getAllRatingDiUlasByMitra(idMitra);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const getAllRatingRateByMitra = async (req, res) => {
  try {
    const { idMitra, rate } = req.params;
    console.log(rate);
    const result = await RatingModel.getAllRatingRateByMitra(
      idMitra,
      parseInt(rate)
    );
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRatingByIdUser,
  createRatingUser,
  getAllRatingDiUlasByIdUser,
  getAllRatingDiUlasByMitra,
  getAllRatingRateByMitra,
};
