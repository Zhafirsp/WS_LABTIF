const { Op } = require("sequelize");
const { User, Laboran, Mahasiswa } = require("../db/models");
const { resSend, resError } = require("../helpers/response");
const { hashPassword } = require("../helpers/bcrypt");

class UserController {
  // ADD New User Otomatis untuk Mahasiswa Baru
  static async addMahasiswaAsUser(req, res, next) {
    try {
      const dataMahasiswas = await Mahasiswa.findAll();

      const createdUsers = [];

      for (const mahasiswa of dataMahasiswas) {
        const { nim, email } = mahasiswa;

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
            email: email,
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
        resSend(
          201,
          "Data Mahasiswa berhasil didaftarkan sebagai User",
          createdUsers,
          res
        );
      } else {
        resSend(200, "Data User sudah up-to-date", createdUsers, res);
      }
    } catch (error) {
      next(error);
    }
  }

  // ADD New User Manual
  static async addUser(req, res, next) {
    try {
      const { username, password, email, no_hp, image_url, role } = req.body;

      // Mencegah duplikasi username dan email
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      // User sudah terdaftar?
      if (existingUser) {
        if (existingUser.username === username) {
          return resError(400, "Username sudah terdaftar", res);
        } else if (existingUser.email === email) {
          return resError(400, "Email sudah terdaftar", res);
        }
      } else {
        // Username belum terdaftar?
        const newUser = await User.create({
          username,
          password,
          email,
          no_hp,
          image_url,
          role,
        });

        resSend(201, "Akun User baru berhasil ditambahkan", newUser, res);
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
        return resSend(200, "Berhasil mendapatkan data User", dataUsers, res);
      }
    } catch (error) {
      next(error);
    }
  }

  // GET User by User ID
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
        resError(404, `Data User dengan id ${userID} tidak ditemukan`, res);
      } else {
        resSend(
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

  // UPDATE User by User ID
  static async updateUserById(req, res, next) {
    const userID = req.params.id;

    const { username, password, email, role } = req.body;

    const dataUser = await User.findOne({
      where: {
        user_id: Number(userID),
      },
    });

    if (!dataUser) {
      resError(404, `Data User dengan id ${userID} tidak ditemukan`, res);
    } else {
      // Jika ada username atau email yang akan diupdate
      const filterQuery = {};

      if (username) {
        filterQuery.username = username;
      }
      if (email) {
        filterQuery.email = email;
      }
      const existingUser = await User.findOne({
        where: {
          [Op.or]: filterQuery,
        },
      });

      // User sudah terdaftar?
      if (existingUser) {
        if (existingUser.username === username) {
          return resError(400, "Username sudah terdaftar", res);
        } else if (existingUser.email === email) {
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
          resError(
            400,
            "Kata sandi harus memiliki setidaknya 8 karakter yang terdiri dari huruf besar dan huruf kecil, angka, simbol (!@#$_%^&*). Contoh: l4B-T!f2023",
            res
          );
        }
      }

      // Jika ada role yang akan diupdate
      // if (role) {
      //   if (account?.role !== "Koordinator Lab") {
      //     // return resError(400, "Access denied!", res);
      //     return console.log("BUKAN ADMIN");
      //   } else {
      //     return console.log("INI ADMIN");
      //   }
      // }

      await User.update(req.body, {
        where: {
          user_id: Number(userID),
        },
      });

      // Jika username berubah, dilakukan perubahan nip di tabel Laboran
      if (username) {
        const dataLaboran = await Laboran.findOne({
          where: {
            user_id: Number(userID),
          },
        });
        // Data Laboran ada?
        if (dataLaboran) {
          await Laboran.update(
            {
              nip: username,
            },
            {
              where: {
                user_id: Number(userID),
              },
            }
          );
        }
      }

      resSend(
        200,
        `Data User dengan id ${userID} berhasil diubah`,
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
        await User.destroy({
          where: {
            user_id: Number(userID),
          },
        });
        resSend(
          200,
          `Data User dengan id ${userID} berhasil dihapus`,
          dataUser,
          res
        );
      } else {
        resError(404, `Data User dengan id ${userID} tidak ditemukan`, res);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
