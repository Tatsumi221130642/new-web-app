const connection = require("../db.js");

const users = async () => {
  try {
    const [result] = await connection.execute(`SELECT * FROM tbl_users`);
    return result;
  } catch (error) {
    throw error;
  }
};

const getUserDetailById = async (id) => {
  try {
    const [result] = await connection.execute(
      `SELECT * FROM tbl_users WHERE id = ?`,
      [id]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const [result] = await connection.execute(
      `SELECT * FROM tbl_users WHERE email = ?`,
      [email]
    );
    return result;
  } catch (error) {
    throw error;
  }
};
const updateUser = async (body, id) => {
  try {
    const [result] = await connection.execute(
      `UPDATE tbl_users 
      SET nama = ?, email = ?, jenis_kelamin = ?, tanggal_lahir = ?, nomor_hp = ? 
      WHERE id = ?`,
      [
        body.nama,
        body.email,
        body.jenis_kelamin,
        body.tanggal_lahir,
        body.nomor_hp,
        id,
      ]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const register = async (body, password) => {
  try {
    const [result] = await connection.execute(
      `INSERT INTO tbl_users 
      (nama,email,password,jenis_kelamin,tanggal_lahir,nomor_hp,image,role)
      VALUES (?,?,?,?,?,?,?,?)`,
      [
        body.nama,
        body.email,
        password,
        body.jenis_kelamin,
        body.tanggal_lahir,
        body.nomor_hp,
        body.image,
        "USER",
      ]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const login = async (email) => {
  try {
    const [result] = await connection.execute(
      `SELECT * FROM tbl_users WHERE email = ? AND role = 'USER'`,
      [email]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// const getToken = async (token) => {
//   try {
//     const [result] = await connection.execute(
//       `SELECT * FROM tbl_users WHERE token = ?`,
//       [token]
//     );
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

// const updateToken = async (token, id) => {
//   try {
//     const [result] = await connection.execute(
//       `UPDATE tbl_users SET token = ? WHERE id = ?`,
//       [token, id]
//     );
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

module.exports = {
  users,
  getUserDetailById,
  updateUser,
  register,
  login,
  getUserByEmail,
  // updateToken,
  // getToken,
};
