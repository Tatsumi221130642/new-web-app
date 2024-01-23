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

const createMitraProfilLayanan = async (idUser, image, body) => {
  try {
    const query = `
    INSERT INTO mitra (id_user,id_kategori,nama_servis,image,status,deskripsi)
    VALUES(?,?,?,?,?,?)
    `;
    const [result] = await connection.execute(query, [
      idUser,
      body.id_kategori,
      body.nama_servis,
      image,
      body.status,
      body.deskripsi,
    ]);
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
    SELECT m.id_mitra,m.nama_servis,m.image,a.nama_jalan
    FROM mitra m
    JOIN alamat a
    ON m.id_user = a.id_user
    WHERE m.id_kategori = ?
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
    SELECT m.id_mitra,m.id_user,m.id_kategori,m.nama_servis,m.image,m.deskripsi,m.status,g.image AS galeri_img,a.kabupaten,a.kecamatan
    FROM mitra m
    JOIN galeri g
    ON m.id_mitra = g.id_mitra
    JOIN alamat a
    ON a.id_user = m.id_user
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
  createMitraProfilLayanan,
};
