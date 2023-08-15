const { Kelas, Krs, Penilaian } = require("../db/models");
const { resError, resSend } = require("../helpers/response");

class PenilaianController {
  // GET Praktikan Periode KRS Kode MK
  static async getAllPraktikan(req, res, next) {
    try {
      const kelasID = req.params.kelasID;
      const { periode } = req.body;

      const dataKRS = await Krs.findAll({
        where: {
          periode_krs: periode,
          kelas_id: kelasID,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data KRS kosong?
      if (dataKRS.length === 0) {
        return resError(
          404,
          `Data Praktikan periode ${periode} dengan kelas id ${kelasID} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan data Praktikan periode ${periode} dengan kelas id ${kelasID}`,
          dataKRS,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // Add New Penilaian
  static async addNewNilaiByKrsId(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // GET Praktikan Periode KRS Kode MK
  static async getAllPraktikan(req, res, next) {
    try {
      const krsID = req.params.krsID;

      const dataKRS = await Krs.findOne({
        where: {
          krs_id: Number(krsID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data KRS kosong?
      if (!dataKRS) {
        return resError(
          404,
          `Data Praktikan dengan id ${krsID} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan data Praktikan dengan id ${krsID}`,
          dataKRS,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PenilaianController;
