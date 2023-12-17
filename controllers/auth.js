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
      return res.json({ message: "Silahkan register terlebih dahulu" });
    const result = await usersModel.login(email);
    if (result.length <= 0) {
      res.json({
        message: "Login failed",
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
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
}

// const logOut = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await usersModel.getUserDetailById(id);
//     if (result.length <= 0) {
//       return res.json({ message: "logout failed" });
//     }
//     res.json({ message: "success logout" });
//   } catch (error) {
//     throw error;
//   }
// };

module.exports = { login };
