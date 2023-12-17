const jwt = require("jsonwebtoken");

const authenticationToken = (req, res, next) => {
  // const token = req.headers["authorization"];
  const token = req.cookies.token;
  console.log(token);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET_KEY_JWT, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = { authenticationToken };
