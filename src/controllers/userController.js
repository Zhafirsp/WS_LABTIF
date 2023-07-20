const { Op } = require("sequelize");
const { User } = require("../db/models");
const { resSend, resError } = require("../helpers/response");

class UserController {
  // ADD New User
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

        resSend(201, `Akun User baru berhasil ditambahkan`, newUser, res);
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
          exclude: ["password", "created_at", "updated_at"],
        },
      });
      // Data Kosong?
      if (dataUsers.length == 0) {
        resError(404, "Data User Kosong", res);
      } else {
        resSend(200, "GET Data User Berhasil", dataUsers, res);
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
        resError(404, `Data user id ${userID} tidak ditemukan`, res);
      } else {
        resSend(
          200,
          `Berhasil mendapatkan data user dengan id ${userID}`,
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
      resError(404, `Data user id ${userID} tidak ditemukan`, res);
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

          // Mengecualikan pencarian pada user ID yang akan diupdate
          [Op.not]: { user_id: Number(userID) },
        },
      });

      // User sudah ada?
      if (existingUser) {
        if (existingUser.username === username) {
          return resError(400, "Username sudah ada", res);
        } else if (existingUser.email === email) {
          return resError(400, "Email sudah ada", res);
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

      resSend(200, `Data user id ${userID} berhasil diubah`, req.body, res);
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
        resSend(200, `Data user id ${userID} berhasil dihapus`, dataUser, res);
      } else {
        resError(404, `Data user id ${userID} tidak ditemukan`, res);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
