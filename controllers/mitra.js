const MitraModel = require("../models/MitraModel.js");

const getMitraProfilLayanan = async (req, res) => {
  try {
    const { idUser } = req.params;
    const result = await MitraModel.getMitraProfilLayanan(idUser);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const updateStatus = async (req, res) => {
  try {
    const { idUser } = req.params;
    const { status } = req.body;
    const result = await MitraModel.updateStatus(idUser, status);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const updateMitraProfilLayanan = async (req, res) => {
  try {
    const { idUser } = req.params;
    const image = req.file;
    const body = req.body;
    const isImage = image ? image.filename : body.image;

    console.log(image, idUser, body, isImage);
    const result = await MitraModel.updateMitraProfilLayanan(
      idUser,
      isImage,
      body
    );
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const postGalleriesMitra = async (req, res) => {
  try {
    const { idMitra } = req.params;
    const images = req.files;
    const results = [];
    for (const image of images) {
      const result = await MitraModel.postGalleriesMitra(
        idMitra,
        image.filename,
        image.filename,
        image.size
      );
      results.push(result);
    }
    res.status(200).json({ message: "success", data: results });
  } catch (error) {
    throw error;
  }
};

const getAllGalleriesMitra = async (req, res) => {
  try {
    const { idMitra } = req.params;
    const result = await MitraModel.getAllGalleriesMitra(idMitra);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const getAllMitraByIdCategory = async (req, res) => {
  try {
    const { idCategory } = req.params;
    console.log(idCategory);
    const result = await MitraModel.getAllMitraByIdCategory(idCategory);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const getDetailMitra = async (req, res) => {
  try {
    const { idMitra } = req.params;
    const result = await MitraModel.getDetailMitra(idMitra);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMitraProfilLayanan,
  updateStatus,
  updateMitraProfilLayanan,
  postGalleriesMitra,
  getAllGalleriesMitra,
  getAllMitraByIdCategory,
  getDetailMitra,
};
