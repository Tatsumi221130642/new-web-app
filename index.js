const express = require("express");
const env = require("dotenv");
env.config();
const connection = require("./db.js");
const bodyParser = require("body-parser");
const webRoutes = require("./routes/web.js");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const path = require("path");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// web routes
app.use("/web", webRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Success" });
});

const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// app.patch("/tes", upload.single("image"), (req, res) => {
//   console.log(req.file);
// });
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
