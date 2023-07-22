const { Pendaftaran } = require("../db/models");
const { resError, resSend } = require("../helpers/response");

class PendaftaranController {
  // ADD new Pendaftaran
  static async addPendaftaran(req, res, next) {
    try {
      // const { tanggal_daftar, nim, file_syarat } = req.body;
      // const newPendaftaran = await Pendaftaran.create({
      //   tanggal_daftar: new Date(),
      //   nim,
      //   file_syarat,
      // });
    } catch (error) {
      next(error);
    }
  }

  // GET All Pendaftaran
  static async getAllPendaftaran(req, res, next) {
    try {
      const dataPendaftarans = await Pendaftaran.findAll({
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data pendaftaran kosong?
      if (dataPendaftarans.length === 0) {
        resError(404, "Data pendaftaran kosong", res);
      } else {
        resSend(
          200,
          "Berhasil mendapatkan data pendaftaran",
          dataPendaftarans,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // GET Pengumuman
  static async getPengumuman(req, res, next) {
    try {
      const dataPengumuman = await Pendaftaran.findAll({
        where: {
          status: "Diterima",
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data pengumuman ada?
      if (dataPengumuman.length === 0) {
        resError(404, "Data Pengumuman kosong", res);
      } else {
        resSend(
          200,
          "Berhasil mendapatkan data pengumuman",
          dataPengumuman,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // GET Pendaftaran By NIM
  static async getPendaftaranByNim(req, res, next) {
    try {
      const mahasiswaNIM = req.params.nim;

      const dataPendaftaran = await Pendaftaran.findOne({
        where: {
          nim: mahasiswaNIM,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data pendaftaran ada?
      if (!dataPendaftaran) {
        resError(
          404,
          `Data pendaftaran dengan NIM ${mahasiswaNIM} tidak ditemukan`,
          res
        );
      } else {
        resSend(
          200,
          `Berhasil mendapatkan data pendaftaran dengan NIM ${mahasiswaNIM}`,
          dataPendaftaran,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // UPDATE Pendaftaran By NIM
  static async updatePendaftaranByNim(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // DELETE Pendaftaran By NIM
  static async deletePendaftaranByNim(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PendaftaranController;
