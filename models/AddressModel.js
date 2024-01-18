const connection = require("../db.js");

const getAllAddress = async (id) => {
  try {
    const [result] = await connection.execute(
      `SELECT * FROM alamat WHERE id_user = ?`,
      [id]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const getSingleAddressById = async (idAddress) => {
  try {
    const [result] = await connection.execute(
      `SELECT * FROM alamat WHERE id_alamat = ?`,
      [idAddress]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const updateAddressById = async (body, idAddress) => {
  try {
    const [result] = await connection.execute(
      `
    UPDATE alamat
    SET id_user = ?, label_alamat = ?, no_telp = ?, nama_jalan = ?, provinsi = ?, kabupaten = ?,kecamatan = ?, deskripsi = ?, updated_at = NOW()
    WHERE id_alamat = ? AND id_user = ?
    `,
      [
        body.id_user,
        body.label_alamat,
        body.no_telp,
        body.nama_jalan,
        body.provinsi,
        body.kabupaten,
        body.kecamatan,
        body.deskripsi,
        idAddress,
        body.id_user,
      ]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const createAddress = async (body) => {
  try {
    // console.log(body.label_alamat);
    const [result] = await connection.execute(
      `INSERT INTO alamat 
      (id_user,label_alamat,no_telp,nama_jalan,provinsi,kabupaten,kecamatan,deskripsi)
      VALUES (?,?,?,?,?,?,?,?)`,
      [
        body.id_user,
        body.label_alamat,
        body.no_telp,
        body.nama_jalan,
        body.provinsi,
        body.kabupaten,
        body.kecamatan,
        body.deskripsi,
      ]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteAddress = async (body, idAddress) => {
  try {
    const [result] = await connection.execute(
      `DELETE FROM alamat WHERE id_alamat = ? AND id_user = ?`,
      [idAddress, body.id_user]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAddress,
  getSingleAddressById,
  updateAddressById,
  createAddress,
  deleteAddress,
};
