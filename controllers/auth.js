const usersModel = require("../models/UserModel.js");
const MitraModel = require("../models/MitraModel.js");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.js");
const bcrypt = require("bcrypt");

async function login(req, res) {
  try {
    const { id, email, password, role } = req.body; //seharusnya butuh password.

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "email atau password tidak boleh kosong" });
    // if (role !== 1) return res.json({ message: "Anda tidak memiliki akses" });
    const result = await usersModel.login(email);
    const getMitraProfil = await MitraModel.getMitraProfilLayanan(
      result[0].id_user
    );
    if (result.length <= 0) {
      return res.status(401).json({
        message: "Silahkan register terlebih dahulu",
      });
    }

    const cekPassword = await bcrypt.compare(password, result[0].password);
    if (!cekPassword)
      return res.status(401).json({ message: "password salah" });
    const token = jwt.sign(
      { id: result[0].id_user, name: result[0].nama, role: result[0].id_role },
      process.env.SECRET_KEY_JWT,
      { expiresIn: "2 days" }
    );
    if (getMitraProfil.length >= 1) {
      res.json({
        message: "Login success",
        id: result[0].id_user,
        id_mitra: getMitraProfil[0].id_mitra && getMitraProfil[0].id_mitra,
        id_role: result[0].id_role,
        token: token,
      });
    } else {
      res.json({
        message: "Login success",
        id: result[0].id_user,
        id_role: result[0].id_role,
        token: token,
      });
    }
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

module.exports = { login, register };
