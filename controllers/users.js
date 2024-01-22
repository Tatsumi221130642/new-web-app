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
    const body = req.body;
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

const updateUsernameById = async (req, res) => {
  try {
    const { idUser } = req.params;
    const { username } = req.body;
    console.log(idUser, username);
    const result = await userModel.updateUsernameById(idUser, username);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const updateNoTelpById = async (req, res) => {
  try {
    const { idUser } = req.params;
    const { no_telp } = req.body;
    const result = await userModel.updateNoTelpById(idUser, no_telp);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const updateEmailById = async (req, res) => {
  try {
    const { idUser } = req.params;
    const { email } = req.body;
    const result = await userModel.updateEmailById(idUser, email);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

const updatePasswordById = async (req, res) => {
  try {
    const { idUser } = req.params;
    const { password_lama, password_baru, confirm_password } = req.body;
    console.log(password_lama, password_baru);
    const getUserProfil = await userModel.getUserDetailById(idUser);
    const cekPassword = await bcrypt.compare(
      password_lama,
      getUserProfil[0].password
    );
    if (!password_lama)
      return res
        .status(400)
        .json({ message: "Password lama tidak boleh kosong" });
    if (!cekPassword)
      return res.status(401).json({ message: "Password salah" });
    if (!password_baru)
      return res
        .status(400)
        .json({ message: "Password baru tidak boleh kosong" });
    if (!confirm_password)
      return res
        .status(400)
        .json({ message: "Konfirmasi password tidak boleh kosong" });
    if (password_baru !== confirm_password)
      return res
        .status(400)
        .json({ message: "Password dan Konfirmasi password tidak sesuai" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password_baru, salt);
    console.log(hashPassword);
    const result = await userModel.updatePasswordById(idUser, hashPassword);
    res.status(200).json({ message: "success" });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  users,
  getUserDetailById,
  updateUser,
  updateImageByUserId,
  updateUsernameById,
  updateNoTelpById,
  updateEmailById,
  updatePasswordById,
};
