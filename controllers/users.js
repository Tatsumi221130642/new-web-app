const userModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");

const users = async (req, res) => {
  try {
    const result = await userModel.users();
    res.json({ data: result });
  } catch (error) {
    throw error;
  }
};

const getUserDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userModel.getUserDetailById(Number(id));
    if (result.length === 0) {
      res.json({ message: "user not found" });
      return;
    }
    res.json({ message: "user found", data: result });
  } catch (error) {
    throw error;
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const result = await userModel.updateUser(body, Number(id));
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateImageByUserId = async (req, res) => {
  try {
    const image = req.file;
    const { id } = req.params;
    console.log(image);
    console.log(image.filename);
    const result = await userModel.updateImageByUserId(image.filename, id);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    res.status(200).json({ data: result });
  } catch (error) {
    throw error;
  }
};

module.exports = { users, getUserDetailById, updateUser, updateImageByUserId };
