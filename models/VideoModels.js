const connection = require("../db");

const getAllVideos = async () => {
  try {
    const [result] = await connection.execute(`SELECT * FROM video`);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllVideos };
