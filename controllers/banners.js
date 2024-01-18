const BannerModel = require("../models/BannerModel.js");

const getAllBanners = async (req, res) => {
  try {
    const result = await BannerModel.getAllBanners();
    return res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllBanners };
