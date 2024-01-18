const CategoryModel = require("../models/CategoryModel.js");

const getAllCategories = async (req, res) => {
  try {
    const result = await CategoryModel.getAllCategories();
    return res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllCategories };
