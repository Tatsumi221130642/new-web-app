const connection = require("../db");

const createTransaction = async (
  idUser,
  idAlamat,
  idMitra,
  idKategori,
  kodePemesanan,
  keluhan,
  body
) => {
  try {
    const query = `
        INSERT INTO transaksi
        (id_user,id_alamat,id_mitra,id_kategori,kode_pemesanan,nama_customer,
          no_telp,tanggal_layanan,waktu_layanan,keluhan,jenis_properti,tangga,deskripsi,status)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `;
    const [result] = await connection.execute(query, [
      idUser,
      idAlamat,
      idMitra,
      idKategori,
      kodePemesanan,
      body.nama,
      body.no_telp,
      body.tanggal_layanan,
      body.waktu_layanan,
      keluhan,
      body.jenis_properti,
      body.tangga,
      body.deskripsi,
      "Baru",
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

const createInvoice = async (idTransaksi, kodeInvoice, body) => {
  try {
    const query = `
    INSERT INTO invoice (id_transaksi,kode_invoice,total_tagihan)
    VALUES(?,?,?)
    `;
    return ([result] = await connection.execute(query, [
      idTransaksi,
      kodeInvoice,
      body,
    ]));
  } catch (error) {
    throw error;
  }
};

const getAllTransactionByIdUser = async (idUser) => {
  try {
    const query = `
    SELECT t.id_transaksi,t.id_alamat,t.id_mitra,t.id_kategori,c.nama_kategori,
    t.kode_pemesanan,t.nama_customer,t.no_telp,t.tanggal_layanan,t.waktu_layanan,
    t.jenis_properti,t.tangga,t.status,m.nama_servis,m.image,a.label_alamat,a.nama_jalan,
    a.provinsi,a.kabupaten,a.kecamatan,a.deskripsi
    FROM transaksi t
    JOIN mitra m
    ON t.id_mitra = m.id_mitra
    JOIN alamat a
    ON t.id_alamat = a.id_alamat
    JOIN category c
    ON t.id_kategori = c.id_kategori
    WHERE t.id_user = ?
        `;
    const [response] = await connection.execute(query, [idUser]);
    return response;
  } catch (error) {
    throw error;
  }
};

const getAllTransactionStatusByIdUser = async (idUser, status) => {
  try {
    const query = `
      SELECT t.id_transaksi,t.id_alamat,t.id_mitra,t.id_kategori,c.nama_kategori,
      t.kode_pemesanan,t.nama_customer,t.no_telp,t.tanggal_layanan,t.waktu_layanan,t.jenis_properti,
      t.tangga,t.status,m.nama_servis,m.image,a.label_alamat,a.nama_jalan,a.provinsi,a.kabupaten,
      a.kecamatan,a.deskripsi
      FROM transaksi t
      JOIN mitra m
      ON t.id_mitra = m.id_mitra
      JOIN alamat a
      ON t.id_alamat = a.id_alamat
      JOIN category c
      ON t.id_kategori = c.id_kategori
      WHERE t.id_user = ? AND t.status = ?
          `;
    const [response] = await connection.execute(query, [idUser, status]);
    return response;
  } catch (error) {
    throw error;
  }
};

const getDetailTransactionByIdTransaction = async (idTransaksi) => {
  try {
    const query = `
<<<<<<< HEAD
        SELECT t.id_transaksi,t.id_alamat,t.id_mitra,t.id_kategori,c.nama_kategori,t.kode_pemesanan,
        t.nama_customer,t.no_telp,t.tanggal_layanan,t.waktu_layanan,t.jenis_properti,t.tangga,
        t.status,m.nama_servis,m.image,a.label_alamat,a.nama_jalan,a.provinsi,a.kabupaten,a.kecamatan,
        a.deskripsi,t.created_at,t.keluhan
=======
        SELECT t.id_transaksi,t.id_alamat,t.id_mitra,t.id_kategori,c.nama_kategori,t.kode_pemesanan,t.nama_customer,t.no_telp,t.tanggal_layanan,t.waktu_layanan,t.jenis_properti,t.tangga,t.status,m.nama_servis,m.image,a.label_alamat,a.nama_jalan,a.provinsi,a.kabupaten,a.kecamatan,a.deskripsi,t.created_at,t.keluhan,t.deskripsi AS deskripsi_masalah
>>>>>>> 91b2f8200adc6e377f3fc729754529ed6d238dfb
        FROM transaksi t
        JOIN mitra m
        ON t.id_mitra = m.id_mitra
        JOIN alamat a
        ON t.id_alamat = a.id_alamat
        JOIN category c
        ON t.id_kategori = c.id_kategori
        WHERE t.id_transaksi = ?
            `;
    const [response] = await connection.execute(query, [idTransaksi]);
    return response;
  } catch (error) {
    throw error;
  }
};

const cancelTransaction = async (idTransaksi) => {
  try {
    const query = `
    UPDATE transaksi
    SET status = 'Dibatalkan'
    WHERE id_transaksi = ?
    `;
    const [result] = await connection.execute(query, [idTransaksi]);
    return result;
  } catch (error) {
    throw error;
  }
};

const confirmTransaction = async (idTransaksi) => {
  try {
    const query = `
    UPDATE transaksi
    SET status = 'Berlangsung'
    WHERE id_transaksi = ?
    `;
    const [result] = await connection.execute(query, [idTransaksi]);
    return result;
  } catch (error) {
    throw error;
  }
};

const finishTransaction = async (idTransaksi) => {
  try {
    const query = `
    UPDATE transaksi
    SET status = 'Selesai'
    WHERE id_transaksi = ?
    `;
    const [result] = await connection.execute(query, [idTransaksi]);
    return result;
  } catch (error) {
    throw error;
  }
};

const changeRatingStatus = async (idTransaksi) => {
  try {
    const query = `
    UPDATE transaksi
    SET status_rating = 'Diulas'
    WHERE id_transaksi = ?
    `;
    const [result] = await connection.execute(query, [idTransaksi]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Mitra
const getAllTransactionByIdMitra = async (idMitra) => {
  try {
    const query = `
    SELECT t.id_transaksi,t.id_alamat,t.id_mitra,t.id_kategori,c.nama_kategori,
    t.kode_pemesanan,t.nama_customer,t.no_telp,t.tanggal_layanan,t.waktu_layanan,
    t.jenis_properti,t.tangga,t.status,m.nama_servis,m.image,a.label_alamat,a.nama_jalan,
    a.provinsi,a.kabupaten,a.kecamatan,a.deskripsi
    FROM transaksi t
    JOIN mitra m
    ON t.id_mitra = m.id_mitra
    JOIN alamat a
    ON t.id_alamat = a.id_alamat
    JOIN category c
    ON t.id_kategori = c.id_kategori
    WHERE t.id_mitra = ?
        `;
    const [response] = await connection.execute(query, [idMitra]);
    return response;
  } catch (error) {
    throw error;
  }
};

const getAllTransactionStatusByIdMitra = async (idMitra, status) => {
  try {
    const query = `
    SELECT t.id_transaksi,t.id_alamat,t.id_mitra,t.id_kategori,c.nama_kategori,
    t.kode_pemesanan,t.nama_customer,t.no_telp,t.tanggal_layanan,t.waktu_layanan,
    t.jenis_properti,t.tangga,t.status,m.nama_servis,m.image,a.label_alamat,a.nama_jalan,
    a.provinsi,a.kabupaten,a.kecamatan,a.deskripsi
    FROM transaksi t
    JOIN mitra m
    ON t.id_mitra = m.id_mitra
    JOIN alamat a
    ON t.id_alamat = a.id_alamat
    JOIN category c
    ON t.id_kategori = c.id_kategori
    WHERE t.id_mitra = ? AND t.status = ?
        `;
    const [response] = await connection.execute(query, [idMitra, status]);
    return response;
  } catch (error) {
    throw error;
  }
};

const getInvoiceDetailByIdTransaksi = async (idTransaksi) => {
  try {
    const query = `
    SELECT * FROM invoice WHERE id_transaksi = ?
    `;
    const [result] = await connection.execute(query, [idTransaksi]);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateNominalInvoiceByIdTransaksi = async (body, idTransaksi) => {
  try {
    const query = `
    UPDATE invoice
    SET total_tagihan = ?
    WHERE id_transaksi = ?
    `;
    const [result] = await connection.execute(query, [body, idTransaksi]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTransaction,
  getAllTransactionByIdUser,
  getAllTransactionStatusByIdUser,
  getDetailTransactionByIdTransaction,
  cancelTransaction,
  getAllTransactionByIdMitra,
  getAllTransactionStatusByIdMitra,
  confirmTransaction,
  createInvoice,
  finishTransaction,
  getInvoiceDetailByIdTransaksi,
  updateNominalInvoiceByIdTransaksi,
  changeRatingStatus,
};
