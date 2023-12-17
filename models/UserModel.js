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

const updateUser = async (body, id) => {
  try {
    const [result] = await connection.execute(
      `UPDATE tbl_users SET name = ?, email = ?, address = ? WHERE id = ?`,
      [body.name, body.email, body.address, id]
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
      (name,email,password,address,image,role)
      VALUES (?,?,?,?,?, ?)`,
      [body.name, body.email, password, body.address, body.image, "USER"]
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

const getToken = async (token) => {
  try {
    const [result] = await connection.execute(
      `SELECT * FROM tbl_users WHERE token = ?`,
      [token]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const updateToken = async (token, id) => {
  try {
    const [result] = await connection.execute(
      `UPDATE tbl_users SET token = ? WHERE id = ?`,
      [token, id]
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
  updateToken,
  getToken,
};
