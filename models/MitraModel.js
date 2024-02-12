const connection = require("../db.js");

const getMitraProfilLayanan = async (idUser) => {
  try {
    const query = `SELECT * FROM mitra WHERE id_user = ?`;
    const [result] = await connection.execute(query, [idUser]);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateStatus = async (idUser, statusLayanan) => {
  try {
    const query = `
    UPDATE mitra
    SET status = ?
    WHERE id_user = ?
    `;
    const [result] = await connection.execute(query, [statusLayanan, idUser]);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateMitraProfilLayanan = async (idUser, image, body) => {
  try {
    const query = `
    UPDATE mitra
    SET id_kategori = ?,nama_servis = ?,image=?,deskripsi=?,updated_at=NOW()
    WHERE id_user = ?
    `;
    const [result] = await connection.execute(query, [
      body.id_kategori,
      body.nama_servis,
      image,
      body.deskripsi,
      idUser,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

const postGalleriesMitra = async (
  idMitra,
  image_name,
  image_alt_text,
  image_ukuran
) => {
  try {
    const query = `
    INSERT INTO galeri
    (id_mitra,image,alt_text,ukuran)
    VALUES (?,?,?,?)
    `;
    const [result] = await connection.execute(query, [
      idMitra,
      image_name,
      image_alt_text,
      image_ukuran,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllGalleriesMitra = async (idMitra) => {
  try {
    const query = `
    SELECT * FROM galeri WHERE id_mitra = ?
    `;
    const [result] = await connection.execute(query, [idMitra]);
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllMitraByIdCategory = async (idCategory) => {
  try {
    const query = `
    SELECT * FROM mitra WHERE id_kategori = ?
    `;
    const [result] = await connection.execute(query, [idCategory]);
    return result;
  } catch (error) {
    throw error;
  }
};

const getDetailMitra = async (idMitra) => {
  try {
    const query = `
    SELECT m.id_mitra,m.id_user,m.id_kategori,m.nama_servis,m.image,m.status,m.deskripsi,u.no_telp
    FROM mitra m
    JOIN user u
    ON m.id_user = u.id_user
    WHERE m.id_mitra = ?;
    `;
    const [result] = await connection.execute(query, [idMitra]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMitraProfilLayanan,
  updateStatus,
  updateMitraProfilLayanan,
  postGalleriesMitra,
  getAllGalleriesMitra,
  getAllMitraByIdCategory,
  getDetailMitra,
};