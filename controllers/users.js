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
    // const convertId = Number(id);
    const body = req.body;
    const result = await userModel.updateUser(body, Number(id));
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    res.status(200).json({ data: result });
    // console.log(typeof convertId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const register = async (req, res) => {
  try {
    const body = req.body;

    const { password } = body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const result = await userModel.register(body, hashPassword);
    res.status(201).json({ message: "success register" });
  } catch (error) {
    throw error;
  }
};

const logout = async (req, res) => {
  try {
    // const token = req.cookies.token;
    // const user = await userModel.getToken(token);
    // const userId = user[0].id;
    // await userModel.updateToken(null, userId);
    res.clearCookie("token");
    res.json({ message: "success delete" });
  } catch (error) {
    throw error;
  }
};
module.exports = { users, getUserDetailById, updateUser, register, logout };
