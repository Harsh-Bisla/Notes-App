const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function authenticate(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ msg: "Please login", success: false });
  }

  try {
    const data = jwt.verify(token, SECRET_KEY); 
    req.user = data; 
    next(); 
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(403).send({ msg: "Invalid or expired token", success: false });
  }
}

module.exports = authenticate;
