const { User, Laboran } = require("../db/models");
const { resSend, resError } = require("../helpers/response");

class LaboranController {
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
        return resError(404, `Data username ${username} tidak ditemukan`, res);
      } else if (dataUser?.role !== "Laboran") {
        // bukan Laboran?
        return resError(400, `Data username ${username} bukan Laboran`, res);
      } else {
        const laboranExists = await Laboran.findOne({
          where: {
            nip: username,
          },
        });

        // Data laboran sudah ada?
        if (laboranExists) {
          return resError(
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

          return resSend(
            200,
            "Berhasil menambahkan data Laboran baru",
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
      if (dataLaborans.length === 0) {
        return resError(404, "Data Laboran kosong", res);
      } else {
        return resSend(
          200,
          "Berhasil mendapatkan seluruh data Laboran",
          dataLaborans,
          res
        );
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
      return resError(
        404,
        `Data Laboran dengan NIP ${laboranNIP} tidak ditemukan`,
        res
      );
    } else {
      return resSend(
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
        return resError(
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
          return resError(400, "Nama Laboran sudah terdaftar", res);
        } else {
          await Laboran.update(req.body, {
            where: {
              nip: laboranNIP,
            },
          });
          return resSend(
            200,
            `Berhasil mengubah data Laboran dengan NIP ${laboranNIP}`,
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

      // Data Laboran ada?
      if (!dataLaboran) {
        return resError(
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
        return resSend(
          200,
          `Berhasil menghapus data Laboran dengan NIP ${laboranNIP}`,
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
