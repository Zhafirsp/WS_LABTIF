const { User } = require("../db/models");

class ProfileController {
  // GET Data Profile
  static async getProfile(req, res, next) {
    try {
      const userLogin = req.userLogin;

      const user = await User.findOne({
        where: {
          user_id: Number(userLogin.user_id),
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
        no_hp: user.no_hp,
        image_url: user.image_url,
        role: user.role,
      };

      if (!user) {
        return resError(404, "Data User tidak ditemukan", res);
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan data profile dengan username${userLogin?.username}`,
          response,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // UPDATE Data Profile
  static async updateProfile(req, res, next) {
    try {
      const { password, email } = req.body;

      const user = await User.findOne({
        where: {
          user_id: Number(userLogin.user_id),
        },
      });

      // Jika ada email yang akan diupdate
      if (email) {
        const emailExist = await User.findOne({
          where: {
            email,
          },
        });

        // Mencegah duplikasi email
        if (emailExist) {
          return resError(400, "Email sudah terdaftar", res);
        }
      }

      // Jika ada password yang akan diupdate
      if (password) {
        const passPattern = new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_/!@#$%^&*.])(?=.{8,})"
        );
        if (passPattern.test(password)) {
          req.body.password = hashPassword(password);
        } else {
          return resError(
            400,
            "Kata sandi harus memiliki setidaknya 8 karakter yang terdiri dari huruf besar dan huruf kecil, angka, simbol (!@#$_%^&*). Contoh: l4B-T!f2023",
            res
          );
        }
      }

      const userID = user?.user_id;

      await User.update(req.body, {
        where: {
          user_id: Number(userID),
        },
      });

      return resSend(
        200,
        `Berhasil mengubah data profile dengan username${userLogin?.username}`,
        req.body,
        res
      );
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ProfileController;
