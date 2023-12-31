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
        resSend(
          200,
          "Berhasil mendapatkan seluruh data Asisten",
          dataAsistens,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // GET All Asisten By Status Active
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
        "Berhasil mendapatkan seluruh data Asisten dengan status aktif",
        dataAsisten,
        res
      );
    }
  }

  // GET Asisten By ID
  static async getAslabById(req, res, next) {
    const aslabID = req.params.id;

    const dataAsisten = await Asisten.findOne({
      where: {
        asisten_id: aslabID,
      },
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });

    if (!dataAsisten) {
      resError(404, `Data Asisten dengan id ${aslabID} tidak ditemukan`, res);
    } else {
      resSend(
        200,
        `Berhasil mendapatkan data Asisten dengan id ${aslabID}`,
        dataAsisten,
        res
      );
    }
  }

  // UPDATE Asisten By ID
  static async updateAslabById(req, res, next) {
    try {
      const aslabID = req.params.id;
      const { golongan, is_active } = req.body;

      const dataAsisten = await Asisten.findOne({
        where: {
          asisten_id: aslabID,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Asisten ada?
      if (!dataAsisten) {
        return resError(
          404,
          `Data Asisten dengan id ${aslabID} tidak ditemukan`,
          res
        );
      } else {
        const updatedAslab = {
          golongan,
          is_active,
        };

        await Asisten.update(updatedAslab, {
          where: {
            asisten_id: aslabID,
          },
        });

        return resSend(
          200,
          `Berhasil mengubah data Asisten dengan id ${aslabID}`,
          updatedAslab,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE Asisten By ID
  static async deleteAslabById(req, res, next) {
    try {
      const aslabID = req.params.id;

      const dataAsisten = await Asisten.findOne({
        where: {
          asisten_id: aslabID,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Asisten ada?
      if (!dataAsisten) {
        return resError(
          404,
          `Data Asisten dengan id ${aslabID} tidak ditemukan`,
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

        const deletedAsisten = {
          asisten_id: dataAsisten.asisten_id,
          nama_asisten: dataAsisten.nama_asisten,
          golongan: dataAsisten.golongan,
          periode: dataAsisten.periode,
          is_active: false,
        };
        await Asisten.update(deletedAsisten, {
          where: {
            asisten_id: aslabID,
          },
        });

        return resSend(
          200,
          `Berhasil menghapus data Asisten dengan id ${aslabID}`,
          deletedAsisten,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = AsistenController;
