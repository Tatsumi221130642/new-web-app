const express = require("express");
const env = require("dotenv");
env.config();
const connection = require("./db.js");
const bodyParser = require("body-parser");
const webRoutes = require("./routes/web.js");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// web routes
app.use("/web", webRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Success" });
});

// app.post("/user", (req, res) => {
//   const query = "INSERT INTO tbl_users SET ?";
//   connection.query(query, req.body, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.status(500).json({ message: "Error retrieving data", user });
//     } else {
//       res.status(200).json({ message: "Success insert data", data: result });
//     }
//   });
// });

// // UPDATE USER BY ID
// app.put("/user/:id", (req, res) => {
//   const { id } = req.params;
//   const { name, email, password, address, image, role } = req.body;
//   const query =
//     "UPDATE tbl_users SET name=?,email=?,password=?,address=?,image=?,role=? WHERE id = ?";
//   connection.query(
//     query,
//     [name, email, password, address, image, role, id],
//     (err, result) => {
//       if (err) {
//         res.status(500).json({ message: "Error retrieving data", user });
//       } else {
//         res.status(200).json({ message: "Success update user", data: result });
//       }
//     }
//   );
// });

// // DELETE USER BY ID
// app.delete("/user/:id", (req, res) => {
//   const { id } = req.params;
//   const query = "DELETE FROM tbl_users WHERE id = ?";
//   connection.query(query, id, (err, result) => {
//     if (err) {
//       res.status(500).json({ message: "Error retrieving data", user });
//     } else {
//       res.status(200).json({ message: "Success delete user", data: result });
//     }
//   });
// });
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
