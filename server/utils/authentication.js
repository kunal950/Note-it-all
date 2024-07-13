const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authheader = req.headers["authorization"];
  const token = authheader && authheader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401).json({ error: true, message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticate };
