const connection = require("../db");

// Api Rating user
const getAllRatingByIdUser = async (idUser) => {
  try {
    const query = `
        SELECT t.id_transaksi,t.id_user,t.kode_pemesanan,t.id_kategori,m.id_mitra,m.nama_servis,c.nama_kategori,m.image
        FROM transaksi t
        JOIN user u
        ON t.id_user = u.id_user
        JOIN category c
        ON c.id_kategori = t.id_kategori
        JOIN mitra m
        ON m.id_mitra = t.id_mitra
        WHERE t.id_user = ? AND t.status_rating = "Belum Diulas" AND t.status = "Selesai"
        `;
    const [result] = await connection.execute(query, [idUser]);
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllRatingDiUlasByIdUser = async (idUser) => {
  try {
    const query = `
    SELECT t.id_transaksi,t.id_user,t.kode_pemesanan,m.nama_servis,c.nama_kategori,m.image,r.rate,r.deskripsi,r.created_at
    FROM transaksi t
    JOIN user u
    ON t.id_user = u.id_user
    JOIN category c
    ON c.id_kategori = t.id_kategori
    JOIN mitra m
    ON m.id_mitra = t.id_mitra
    JOIN rating r
    ON r.id_transaksi = t.id_transaksi
    WHERE t.id_user = ? AND t.status_rating = "Diulas" AND t.status = "Selesai"
    `;
    const [result] = await connection.execute(query, [idUser]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const createRatingUser = async (idTransaksi, body) => {
  try {
    const query = `
    INSERT INTO rating (id_transaksi,id_user,id_mitra,rate,deskripsi)
    VALUES(?,?,?,?,?)
    `;
    const [result] = await connection.execute(query, [
      idTransaksi,
      body.id_user,
      body.id_mitra,
      body.rate,
      body.deskripsi,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllRatingDiUlasByMitra = async (idMitra) => {
  try {
    const query = `
    SELECT t.id_transaksi,t.id_user,t.kode_pemesanan,u.nama,u.img,m.nama_servis,c.nama_kategori,m.image,r.rate,r.deskripsi,r.created_at
    FROM transaksi t
    JOIN user u
    ON t.id_user = u.id_user
    JOIN category c
    ON c.id_kategori = t.id_kategori
    JOIN mitra m
    ON m.id_mitra = t.id_mitra
    JOIN rating r
    ON r.id_transaksi = t.id_transaksi
    WHERE t.id_mitra = ? AND t.status_rating = "Diulas" AND t.status = "Selesai"
    `;
    const [result] = await connection.execute(query, [idMitra]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getAllRatingRateByMitra = async (idMitra, rate) => {
  try {
    const query = `
    SELECT t.id_transaksi,t.id_user,t.kode_pemesanan,m.nama_servis,c.nama_kategori,m.image,r.rate,r.deskripsi,r.created_at
    FROM transaksi t
    JOIN user u
    ON t.id_user = u.id_user
    JOIN category c
    ON c.id_kategori = t.id_kategori
    JOIN mitra m
    ON m.id_mitra = t.id_mitra
    LEFT JOIN rating r
    ON r.id_transaksi = t.id_transaksi
    WHERE t.id_mitra = ? AND r.rate = ?
    `;
    const [result] = await connection.execute(query, [idMitra, rate]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRatingByIdUser,
  createRatingUser,
  getAllRatingDiUlasByIdUser,
  getAllRatingDiUlasByMitra,
  getAllRatingRateByMitra,
};
