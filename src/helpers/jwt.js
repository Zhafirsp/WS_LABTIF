const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;

const generateToken = (data, expiresIn) => {
  return jwt.sign(data, secret, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = { generateToken, verifyToken };
