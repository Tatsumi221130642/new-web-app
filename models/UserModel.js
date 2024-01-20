const connection = require("../db.js");

const users = async () => {
  try {
    const [result] = await connection.execute(`SELECT * FROM user`);
    return result;
  } catch (error) {
    throw error;
  }
};

const getUserDetailById = async (id) => {
  try {
    const [result] = await connection.execute(
      `SELECT * FROM user WHERE id_user = ?`,
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
      `SELECT * FROM user WHERE email = ?`,
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
      `UPDATE user 
      SET nama = ?,username = ?, email = ?, jenis_kelamin = ?, tanggal_lahir = ?, no_telp = ?,updated_at = NOW() 
      WHERE id_user = ?`,
      [
        body.nama,
        body.username,
        body.email,
        body.jenis_kelamin,
        body.tanggal_lahir,
        body.no_telp,
        id,
      ]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const updateImageByUserId = async (image, idUser) => {
  try {
    const query = `
      UPDATE user
      SET img = ?
      WHERE id_user = ?
    `;
    const response = await connection.execute(query, [image, idUser]);
    return response;
  } catch (error) {
    throw error;
  }
};

const register = async (body, password) => {
  try {
    const [result] = await connection.execute(
      `INSERT INTO user
      (nama,username,email,password,jenis_kelamin,tanggal_lahir,no_telp,img,id_role)
      VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        body.nama,
        body.username,
        body.email,
        password,
        body.jenis_kelamin,
        body.tanggal_lahir,
        body.no_telp,
        body.img,
        body.id_role,
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
      `SELECT * FROM user WHERE email = ?`,
      [email]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  users,
  getUserDetailById,
  updateUser,
  register,
  login,
  getUserByEmail,
  updateImageByUserId,
};
