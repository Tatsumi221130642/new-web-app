const VideoModel = require("../models/VideoModels.js");

const getAllVideos = async (req, res) => {
  try {
    const result = await VideoModel.getAllVideos();
    return res.status(200).json({ message: "success", data: result });
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllVideos };
