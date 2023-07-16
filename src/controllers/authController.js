const { User } = require("../db/models");
const { comparePassword } = require("../helpers/bcrypt");
const { resSend, resError } = require("../helpers/response");
const { generateToken } = require("../helpers/jwt");

class AuthController {
  // Login
  static async Login(req, res, next) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({
        where: {
          username,
        },
      });
      // Akun tidak ada?
      if (!user) {
        resError(401, "Akun tidak terdaftar", res);
        // Akun ada?
      } else {
        const matchedPw = comparePassword(password, user.password);
        // Password benar?
        if (matchedPw) {
          const payload = {
            user_id: user.user_id,
            username: user.username,
            role: user.role,
          };
          const expiresIn = 60 * 60;
          const token = generateToken(payload, expiresIn);
          // response sama dengan live_token SEVIMA
          res.status(200).send({
            message: "Login Berhasil",
            access_token: token,
            expires_in: expiresIn.toString(),
          });
          // Password salah?
        } else {
          resError(401, "Password Salah", res);
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
