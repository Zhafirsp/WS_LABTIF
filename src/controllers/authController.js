const { User, Mahasiswa } = require("../db/models");
const { comparePassword } = require("../helpers/bcrypt");
const { resSend, resError } = require("../helpers/response");
const {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt");

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
        return resError(401, "Unauthorized", res);
        // Akun ada?
      } else {
        const matchedPw = comparePassword(password, user.password);
        // Password benar?
        if (matchedPw) {
          const dataUser = {
            user_id: user.user_id,
            username: user.username,
            role: user.role,
          };
          const expiresIn = 60 * 60; // 1 jam
          const token = generateToken(dataUser, expiresIn);
          const refresh_token = generateRefreshToken(dataUser, 24 * expiresIn); // 1 hari

          // Update data access_token pada data user
          user.access_token = refresh_token;
          await user.save();

          // Simpan refreshToken ke user cookie
          res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });

          // response sama dengan live_token SEVIMA
          return res.status(200).send({
            message: "User Berhasil Login",
            access_token: token,
            expires_in: expiresIn.toString(),
          });
          // Password salah?
        } else {
          return resError(401, "Password Salah", res);
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  // Refresh Token
  static async refreshToken(req, res, next) {
    try {
      // Refresh token ada di cookies?
      const cookiesToken = req.cookies?.refresh_token;

      if (!cookiesToken) {
        return resError(401, "Unauthorized", res);
      }

      const decoded = verifyRefreshToken(cookiesToken);

      if (!decoded) {
        return resError(401, "Invalid Refresh Token", res);
      }

      const user = await User.findOne({
        where: {
          user_id: decoded.user_id,
        },
      });

      if (!user || user.access_token !== cookiesToken) {
        return resError(401, "Unauthorized", res);
      }

      // Refresh access token
      const dataUser = {
        user_id: user.user_id,
        username: user.username,
        role: user.role,
      };

      const expiresIn = 24 * 60 * 60; // 24 jam
      const token = generateToken(dataUser, expiresIn);

      res.status(200).send({
        message: "Refresh Token berhasil",
        access_token: token,
        expires_in: expiresIn.toString(),
      });
    } catch (error) {
      // Menangani kesalahan verifikasi token
      if (error.name === "JsonWebTokenError") {
        return resError(401, "Invalid Token", res);
      } else if (error.name === "TokenExpiredError") {
        return resError(401, "Token Expired", res);
      } else {
        return resError(500, "Internal server error", res);
      }
    }
  }

  // GET Currest User
  static async currentUser(req, res, next) {
    try {
      const username = req.userLogin.username;

      const user = await User.findOne({
        where: {
          username,
        },
        include: {
          model: Mahasiswa,
        },
      });

      const response = {
        user_id: user.user_id,
        username: user.username,
        nama_mahasiswa: user.Mahasiswa.nama_mahasiswa,
        email: user.email,
        role: user.role,
      };

      if (!user) {
        return resError(404, "Data User tidak ditemukan", res);
      } else {
        return resSend(
          200,
          "Ini adalah data user yang sedang login",
          response,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // Logout
  static async Logout(req, res, next) {
    try {
      /* 
        Optional chaining (?.) 
        untuk memastikan tidak terjadi error jika cookie refresh_token tidak ada
      */
      const cookiesToken = req.cookies?.refresh_token;

      if (!cookiesToken) {
        return resError(401, "Unauthorized", res);
      }

      const userID = req.userLogin.user_id;

      const user = await User.findOne({
        where: {
          user_id: Number(userID),
        },
      });

      // Data user tidak ada?
      if (!user) {
        // Menghapus refresh_token yang ada di cookie
        res.clearCookie("refresh_token");

        return resSend(200, "User Berhasil Logout ", null, res);
      }

      // Data user ada?
      await user.update(
        { access_token: null },
        {
          where: { userID },
        }
      );

      res.clearCookie("refresh_token");
      return resSend(200, "User Berhasil Logout ", null, res);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
