const connection = require("../db.js");

const getAllCategories = async () => {
  try {
    const [result] = await connection.execute(`SELECT * FROM category`);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllCategories };
