const { Op } = require("sequelize");
const { User } = require("../db/models");

const googleapi = require("../helpers/googleapi");
const { hashPassword } = require("../helpers/bcrypt");
const { resSend, resError } = require("../helpers/response");

class ProfileController {
  // GET Data Profile
  static async getProfile(req, res, next) {
    try {
      const userLogin = req.userLogin;

      const user = await User.findOne({
        where: {
          user_id: Number(userLogin.user_id),
        },
      });

      const response = {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        no_hp: user.no_hp,
        image_url: user.image_url,
      };

      if (!user) {
        return resError(404, "Data User tidak ditemukan", res);
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan data profile milik username${userLogin?.username}`,
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
      const userLogin = req.userLogin;

      const { username, password, email, role } = req.body;

      const dataUser = await User.findOne({
        where: {
          user_id: Number(userLogin.user_id),
        },
      });

      // Jika ada username yang akan diupdate
      if (username) {
        return resError(400, "Data username tidak bisa diubah", res);
      }

      // Jika ada email yang akan diupdate
      if (email) {
        const emailExist = await User.findOne({
          where: {
            email,
            user_id: {
              // Mengecualikan email yang dimiliki akun tersebut
              [Op.not]: Number(userLogin?.user_id),
            },
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

      // Jika ada role yang akan diupdate
      if (role) {
        // Role user hanya bisa diupdate oleh Laboran
        if (userLogin?.role !== "Laboran") {
          return resError(400, "Akses Dilarang", res);
        }
      }

      // Jika ada inputan gambar
      if (req.file) {
        const { filename } = req.file;
        const fileId = await googleapi.uploadFileToDrive(req.file, filename); // Mengunggah file ke Google Drive
        req.body.image_url = fileId;

        // Jika sebelumnya ada image_url, hapus gambar lama dari google drive
        const oldImageUrl = dataUser.image_url;
        if (oldImageUrl) {
          // Memisahkan ID file dari URL Google Drive
          const urlParts = oldImageUrl.split("/");
          const fileId = urlParts[urlParts.length - 2]; // Mengambil bagian kedua terakhir dari URL sebagai ID file

          // Hapus file dari Google Drive dengan menggunakan ID file
          await googleapi.deleteFileFromDrive(fileId);
        }
      }

      // const userID = user?.user_id;

      await User.update(req.body, {
        where: {
          user_id: Number(userLogin.user_id),
        },
      });

      return resSend(
        200,
        `Berhasil mengubah data profile milik username ${userLogin?.username}`,
        req.body,
        res
      );
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ProfileController;
