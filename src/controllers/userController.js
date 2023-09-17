const { Op } = require("sequelize");
const { User, Mahasiswa } = require("../db/models");
const { resSend, resError } = require("../helpers/response");
const { hashPassword } = require("../helpers/bcrypt");
const googleapi = require("../config/googleapi");

class UserController {
  // ADD New User Otomatis untuk Mahasiswa Baru
  static async addMahasiswaAsUser(req, res, next) {
    try {
      const dataMahasiswas = await Mahasiswa.findAll();

      const createdUsers = [];

      for (const mahasiswa of dataMahasiswas) {
        const { nim } = mahasiswa;

        // Data Mahasiswa sudah memiliki akun?
        let user = await User.findOne({
          where: {
            username: nim,
          },
        });

        // Data Mahasiswa belum memiliki akun?
        if (!user) {
          user = await User.create({
            username: nim,
            password: "l4B-T!f2023",
            email: mahasiswa.email,
            no_hp: mahasiswa.no_hp,
          });

          // Menambahkan user_id baru ke data mahasiswa
          if (!mahasiswa.user_id) {
            // Jika mahasiswa tidak memiliki user_id, otomatis akan ditambahkan ke data Mahasiswa
            mahasiswa.user_id = user.user_id;

            await mahasiswa.save();
          }

          createdUsers.push(user);
        }
      }

      // Ada penambahan data User baru?
      if (createdUsers.length > 0) {
        return resSend(
          201,
          "Berhasil mendaftarkan data Mahasiswa sebagai User",
          createdUsers,
          res
        );
      } else {
        return resSend(200, "Data Mahasiswa kosong", createdUsers, res);
      }
    } catch (error) {
      next(error);
    }
  }

  // ADD New User Manual
  static async addUser(req, res, next) {
    try {
      const { username, password, email, no_hp, role } = req.body;

      // Mencegah duplikasi username dan email
      const userExist = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      // User sudah terdaftar?
      if (userExist) {
        if (userExist.username === username) {
          return resError(400, "Username sudah terdaftar", res);
        } else if (userExist.email === email) {
          return resError(400, "Email sudah terdaftar", res);
        }
      } else {
        // Username belum terdaftar?

        let image_url = null; // Default null jika tidak ada gambar yang diunggah

        // Jika ada inputan gambar
        if (req.file) {
          const { filename } = req.file;

          const fileId = await googleapi.uploadFileToDrive(req.file, filename); // Mengunggah file ke Google Drive
          image_url = fileId;
        }

        const newUser = await User.create({
          username,
          password,
          email,
          no_hp,
          image_url,
          role,
        });

        return resSend(
          201,
          "Berhasil menambahkan akun User baru",
          newUser,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // GET All User
  static async getAllUser(req, res, next) {
    try {
      const dataUsers = await User.findAll({
        attributes: {
          exclude: ["access_token", "password", "created_at", "updated_at"],
        },
      });
      // Data Kosong?
      if (dataUsers.length === 0) {
        return resError(404, "Data User kosong", res);
      } else {
        return resSend(
          200,
          "Berhasil mendapatkan seluruh data User",
          dataUsers,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // GET User by ID
  static async getUserById(req, res, next) {
    try {
      const userID = req.params.id;

      const dataUser = await User.findOne({
        where: {
          user_id: Number(userID),
        },
        attributes: {
          exclude: ["password", "created_at", "updated_at"],
        },
      });

      // Data User ada?
      if (!dataUser) {
        return resError(
          404,
          `Data User dengan id ${userID} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan data User dengan id ${userID}`,
          dataUser,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // UPDATE User by ID
  static async updateUserById(req, res, next) {
    const userID = req.params.id;

    const { username, password, email, role } = req.body;

    const dataUser = await User.findOne({
      where: {
        user_id: Number(userID),
      },
    });

    if (!dataUser) {
      return resError(
        404,
        `Data User dengan id ${userID} tidak ditemukan`,
        res
      );
    } else {
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
              [Op.not]: Number(userID),
            },
          },
        });

        // Mencegah duplikasi email
        if (emailExist) {
          return resError(400, "Email sudah terdaftar", res);
        }
      }

      const userLogin = req.userLogin;
      // Jika ada password yang akan diupdate
      if (password) {
        // Password hanya bisa diupdate oleh pemilik akun itu sendiri
        if (Number(userID) !== Number(userLogin?.user_id)) {
          return resError(400, "Akses Dilarang", res);
        } else {
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

      await User.update(req.body, {
        where: {
          user_id: Number(userID),
        },
      });

      return resSend(
        200,
        `Berhasil mengubah data User dengan id ${userID}`,
        req.body,
        res
      );
    }
  }

  // DELETE User by Id
  static async deleteUserById(req, res, next) {
    try {
      const userID = req.params.id;

      const dataUser = await User.findOne({
        where: {
          user_id: Number(userID),
        },
      });

      if (dataUser) {
        // Jika sebelumnya ada image_url, hapus gambar dari google drive
        const oldImageUrl = dataUser.image_url;
        if (oldImageUrl) {
          // Memisahkan ID file dari URL Google Drive
          const urlParts = oldImageUrl.split("/");
          const fileId = urlParts[urlParts.length - 2]; // Mengambil bagian kedua terakhir dari URL sebagai ID file

          // Hapus file dari Google Drive dengan menggunakan ID file
          await googleapi.deleteFileFromDrive(fileId);
        }

        await User.destroy({
          where: {
            user_id: Number(userID),
          },
        });
        return resSend(
          200,
          `Berhasil menghapus data User dengan id ${userID}`,
          dataUser,
          res
        );
      } else {
        return resError(
          404,
          `Data User dengan id ${userID} tidak ditemukan`,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
