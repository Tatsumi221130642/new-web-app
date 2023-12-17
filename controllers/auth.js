const usersModel = require("../models/UserModel.js");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.js");
const bcrypt = require("bcrypt");

async function login(req, res) {
  try {
    const { id, email, password, role } = req.body; //seharusnya butuh password.

    if (!email) return res.json({ message: "email tidak boleh kosong" });
    if (!password) return res.json({ message: "password tidak boleh kosong" });
    if (role !== "USER")
      return res.json({ message: "Anda tidak memiliki akses" });
    const result = await usersModel.login(email);
    if (result.length <= 0) {
      res.json({
        message: "Silahkan register terlebih dahulu",
      });
      return;
    }

    const cekPassword = await bcrypt.compare(password, result[0].password);
    if (!cekPassword) return res.json({ message: "wrong password" });
    const token = jwt.sign(
      { id: result[0].id, name: result[0].name },
      process.env.SECRET_KEY_JWT,
      { expiresIn: "2 days" }
    );

    // await usersModel.updateToken(token, id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      message: "Login success",
      id: result[0].id,
      // token: token,
    });
  } catch (error) {
    console.log(error);
  }
}

const register = async (req, res) => {
  try {
    const body = req.body;
    const { email } = body;

    const dataFromDb = await usersModel.getUserByEmail(email);
    if (dataFromDb.length > 0 && email === dataFromDb[0].email)
      return res.json({ message: "email sudah terdaftar" });

    const { password } = body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const result = await usersModel.register(body, hashPassword);
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

module.exports = { login, register, logout };
