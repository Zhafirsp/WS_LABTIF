const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;
const refresh = process.env.TOKEN_SECRET_REFRESH;

const generateToken = (data, expiresIn) => {
  return jwt.sign(data, secret, { expiresIn });
};

const generateRefreshToken = (data, expiresIn) => {
  return jwt.sign(data, refresh, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, refresh);
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
};
