const connection = require("../db.js");

const getAllBanners = async () => {
  try {
    const [result] = await connection.execute(`
        SELECT * FROM banner
        `);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllBanners };