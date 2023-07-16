const bcrypt = require("bcrypt");

const hashPassword = (plainPw) => {
  const result = bcrypt.hashSync(plainPw, 10);
  return result;
};

const comparePassword = (plainPw, hashPw) => {
  const matched = bcrypt.compareSync(plainPw, hashPw);
  return matched;
};
module.exports = { hashPassword, comparePassword };
