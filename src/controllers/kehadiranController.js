const { Asisten, JadwalPiket, Kehadiran } = require("../db/models");
const { resSend, resError } = require("../helpers/response");

class KehadiranController {
  // Add New Kehadiran By Piket Id
  static async addKehadiranByPiketId(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // Get Kehadiran By Piket Id
  static async getKehadiranByPiketId(req, res, next) {
    try {
      const piketID = req.params.piketID;
    } catch (error) {
      next(error);
    }
  }

  // Get All Kehadiran
  static async getAllKehadiran(req, res, next) {
    try {
      const dataKehadirans = await Kehadiran.findAll({
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      if (dataKehadirans.length === 0) {
        return resError(404, "Data kehadiran kosong", res);
      } else {
        return resSend(
          200,
          "Berhasil mendapatkan seluruh data kehadiran",
          dataKehadirans,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // Get Kehadiran By Id
  static async getKehadiranById(req, res, next) {
    try {
      const absenID = req.params.id;

      const dataKehadiran = await Kehadiran.findOne({
        where: {
          absen_id: Number(absenID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      if (!dataKehadiran) {
        return resError(
          404,
          `Data kehadiran dengan id ${absenID} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan data kehadiran dengan id ${absenID}`,
          dataKehadiran,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // Update Kehadiran By Id
  static async updateKehadiranById(req, res, next) {
    try {
      const absenID = req.params.id;
      const { asisten_id, nama_asisten, status, pengganti_id } = req.body;

      const dataKehadiran = await Kehadiran.findOne({
        where: {
          absen_id: Number(absenID),
        },
      });

      if (!dataKehadiran) {
        return resError(
          404,
          `Data kehadiran dengan id ${absenID} tidak ditemukan`,
          res
        );
      } else {
        // Jika ada data asisten atau pengganti yang akan diupdate
        if (asisten_id || pengganti_id) {
          const dataAsisten = await Asisten.findOne({
            where: {
              asisten_id,
            },
          });

          // Ubah nama asisten pada data kehadiran
          dataKehadiran.nama_asisten = dataAsisten.nama_asisten;
          await dataKehadiran.save();
        }

        // Jika ada data nama asisten yang akan diupdate
        if (nama_asisten) {
          return resError(
            400,
            "Data nama asisten hanya bisa di update dari data Asisten",
            res
          );
        }

        const updatedKehadiran = {
          asisten_id,
          nama_asisten,
          status,
          pengganti_id,
        };

        await Kehadiran.update(updatedKehadiran, {
          where: {
            absen_id: Number(absenID),
          },
        });

        return resSend(
          200,
          `Berhasil mengubah data kehadiran dengan id ${absenID}`,
          updatedKehadiran,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = KehadiranController;
