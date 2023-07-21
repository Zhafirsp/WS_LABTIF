const { User, Laboran } = require("../db/models");
const { resSend, resError } = require("../helpers/response");

class LaboranController {
  // GET Laboran By Username
  static async getLaboranByUsername(req, res, next) {
    const username = req.params.username;

    const dataUser = await User.findOne({
      where: {
        username,
      },
      attributes: {
        exclude: ["password", "created_at", "updated_at"],
      },
    });

    // Data user ada?
    if (!dataUser) {
      resError(404, `Data username ${username} tidak ditemukan`, res);
    } else if (dataUser.role !== "Laboran") {
      // bukan Laboran?
      resError(400, `Data username ${username} bukan Laboran`, res);
    } else {
      const laboranExists = await Laboran.findOne({
        where: {
          nip: username,
        },
      });

      // Data laboran sudah ada?
      if (laboranExists) {
        resError(
          400,
          `Username ${username} sudah terdaftar sebagai Laboran`,
          res
        );
      } else {
        resSend(
          200,
          `Berhasil mendapatkan data User dengan username ${username}`,
          dataUser,
          res
        );
      }
    }
  }

  // ADD New Laboran
  static async addLaboranByUsername(req, res, next) {
    try {
      const username = req.params.username;

      const { nama_laboran } = req.body;

      const dataUser = await User.findOne({
        where: {
          username,
        },
        attributes: {
          exclude: ["password", "created_at", "updated_at"],
        },
      });

      // Data user ada?
      if (!dataUser) {
        resError(404, `Data username ${username} tidak ditemukan`, res);
      } else if (dataUser.role !== "Laboran") {
        // bukan Laboran?
        resError(400, `Data username ${username} bukan Laboran`, res);
      } else {
        const laboranExists = await Laboran.findOne({
          where: {
            nip: username,
          },
        });

        // Data laboran sudah ada?
        if (laboranExists) {
          resError(
            400,
            `Username ${username} sudah terdaftar sebagai Laboran`,
            res
          );
        } else {
          // Buat data laboran yang berelasi dengan user_id di tabel User
          const newLaboran = await Laboran.create({
            nip: dataUser.username,
            nama_laboran,
            jenis_pegawai: dataUser.role,
            user_id: dataUser.user_id,
          });

          resSend(
            200,
            "Data laboran baru berhasil ditambahkan",
            newLaboran,
            res
          );
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // GET All Laboran
  static async getAllLaboran(req, res, next) {
    try {
      const dataLaborans = await Laboran.findAll({
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Kosong?
      if (dataLaborans.length == 0) {
        resError(404, "Data Laboran kosong", res);
      } else {
        resSend(200, "Berhasil mendapatkan data Laboran", dataLaborans, res);
      }
    } catch (error) {
      next(error);
    }
  }

  // GET Laboran By NIP
  static async getLaboranByNip(req, res, next) {
    const laboranNIP = req.params.nip;

    const dataLaboran = await Laboran.findOne({
      where: {
        nip: laboranNIP,
      },
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });

    if (!dataLaboran) {
      resError(
        404,
        `Data Laboran dengan NIP ${laboranNIP} tidak ditemukan`,
        res
      );
    } else {
      resSend(
        200,
        `Berhasil mendapatkan data Laboran dengan NIP ${laboranNIP}`,
        dataLaboran,
        res
      );
    }
  }

  // UPDATE Laboran by NIP
  static async updateLaboranByNIP(req, res, next) {
    try {
      const laboranNIP = req.params.nip;

      const { nama_laboran } = req.body;

      const dataLaboran = await Laboran.findOne({
        where: {
          nip: laboranNIP,
        },
      });

      // Data Laboran ada?
      if (!dataLaboran) {
        resError(
          404,
          `Data Laboran dengan NIP ${laboranNIP} tidak ditemukan`,
          res
        );
      } else {
        // Mencegah duplikasi nama Laboran
        const namaExists = await Laboran.findOne({
          where: {
            nama_laboran,
          },
        });

        if (namaExists) {
          resError(400, "Nama Laboran sudah terdaftar", res);
        } else {
          await Laboran.update(req.body, {
            where: {
              nip: laboranNIP,
            },
          });
          resSend(
            200,
            `Data Laboran dengan NIP ${laboranNIP} berhasil diubah`,
            req.body,
            res
          );
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE Laboran by NIP
  static async deleteLaboranByNIP(req, res, next) {
    try {
      const laboranNIP = req.params.nip;

      const dataLaboran = await Laboran.findOne({
        where: {
          nip: laboranNIP,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data ada?
      if (!dataLaboran) {
        resError(
          404,
          `Data Laboran dengan NIP ${laboranNIP} tidak ditemukan`,
          res
        );
      } else {
        await Laboran.destroy({
          where: {
            nip: laboranNIP,
          },
        });
        resSend(
          200,
          `Data Laboran dengan NIP ${laboranNIP} berhasil dihapus`,
          dataLaboran,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = LaboranController;
