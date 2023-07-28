const { User, Asisten } = require("../db/models");
const { resError, resSend } = require("../helpers/response");

class AsistenController {
  // GET All Asisten
  static async getAllAslab(req, res, next) {
    try {
      const dataAsistens = await Asisten.findAll({
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Kosong?
      if (dataAsistens.length === 0) {
        resError(404, "Data Asisten kosong", res);
      } else {
        resSend(200, "Berhasil mendapatkan data Asisten", dataAsistens, res);
      }
    } catch (error) {
      next(error);
    }
  }

  // GET Asisten By ID
  static async getAslabById(req, res, next) {
    const asistenID = req.params.id;

    const dataAsisten = await Asisten.findOne({
      where: {
        asisten_id: asistenID,
      },
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });

    if (!dataAsisten) {
      resError(404, `Data Asisten dengan id ${asistenID} tidak ditemukan`, res);
    } else {
      resSend(
        200,
        `Berhasil mendapatkan data Asisten dengan id ${asistenID}`,
        dataAsisten,
        res
      );
    }
  }

  // GET Asisten By ID
  static async getAslabActive(req, res, next) {
    // Cari data asisten pada periode berjalan yang memiliki status aktif
    const dataAsisten = await Asisten.findAll({
      where: {
        is_active: true,
      },
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });

    // Data dengan status aktif kosong
    if (dataAsisten.length === 0) {
      resError(404, "Data Asisten dengan status aktif tidak ditemukan", res);
    } else {
      resSend(
        200,
        "Berhasil mendapatkan data Asisten dengan status aktif",
        dataAsisten,
        res
      );
    }
  }

  // UPDATE Asisten By ID
  static async updateAslabByID(req, res, next) {
    try {
      const asistenID = req.params.id;
      const { golongan, isActive } = req.body;

      const dataAsisten = await Asisten.findOne({
        where: {
          asisten_id: asistenID,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Asisten ada?
      if (!dataAsisten) {
        return resError(
          404,
          `Data Asisten dengan id ${asistenID} tidak ditemukan`,
          res
        );
      } else {
        // Perubahan golongan
        await Asisten.update(
          { golongan, isActive },
          {
            where: {
              asisten_id: asistenID,
            },
          }
        );
      }
    } catch (error) {
      next(error);
    }
  }
  // DELETE Asisten By ID
  static async deleteAslabByID(req, res, next) {
    try {
      const asistenID = req.params.id;

      const dataAsisten = await Asisten.findOne({
        where: {
          asisten_id: asistenID,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Asisten ada?
      if (!dataAsisten) {
        return resError(
          404,
          `Data Asisten dengan id ${asistenID} tidak ditemukan`,
          res
        );
      } else {
        const dataUser = await User.findOne({
          where: {
            username: dataAsisten.nim,
          },
        });

        // Mengubah role menjadi Mahasiswa
        dataUser.role = "Mahasiswa";
        await dataUser.save();

        await Asisten.destroy({
          where: {
            asisten_id: asistenID,
          },
        });

        return resSend(
          200,
          `Data Asisten dengan id ${asistenID} berhasil dihapus`,
          dataAsisten,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = AsistenController;
