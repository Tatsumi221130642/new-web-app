const multer = require("multer");
const express = require("express");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/gallery");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadGallery = multer({
  storage: storage,
});

module.exports = uploadGallery;
