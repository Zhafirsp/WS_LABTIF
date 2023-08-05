const { Asisten, JadwalPraktik, JadwalPiket } = require("../db/models");
const { resSend, resError } = require("../helpers/response");

class JadwalController {
  // GET All Jadwal Praktik By Periode
  static async getAllPraktikByPeriode(req, res, next) {
    try {
      const periode = req.params.periode;

      const dataPraktiks = await JadwalPraktik.findAll({
        where: {
          periode,
          pertemuan: "1",
          // agar jadwal praktikum yang muncul hanya pertemuan 1 saja
          // memudahkan saat penjadwalan piket asisten
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Praktik kosong?
      if (dataPraktiks.length === 0) {
        return resError(404, "Data jadwal praktik kosong", res);
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan jadwal praktikum by periode ${periode}`,
          dataPraktiks,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // Add New Jadwal Piket
  static async addPiketByPraktikId(req, res, next) {
    try {
      const praktikID = req.params.praktikID;

      const { asisten_id } = req.body;

      const dataPraktik = await JadwalPraktik.findOne({
        where: {
          praktik_id: Number(praktikID),
        },
      });

      // Data jadwal praktik tidak ada?
      if (!dataPraktik) {
        return resError(
          404,
          `Data jadwal praktikum dengan id ${praktikID} tidak ditemukan`,
          res
        );
      } else {
        // Apakah asisten_id sudah ada pada jadwal piket?
        const existingAsisten = await JadwalPiket.findOne({
          where: {
            praktik_id: Number(praktikID),
            asisten_id,
          },
          attributes: {
            exclude: ["created_at", "updated_at"],
          },
        });

        // Data asisten sudah ada pada jadwal?
        if (existingAsisten) {
          return resError(
            400,
            `Asisten dengan id ${asisten_id} sudah ada pada jadwal praktikum dengan id ${praktikID}`,
            res
          );
        } else {
          // Hitung asisten yang sudah ada pada jadwal praktikum tersebut
          const countExistingAsisten = await JadwalPiket.count({
            where: {
              praktik_id: Number(praktikID),
            },
            distinct: true, // data unik saja yang akan dihitung
            col: "asisten_id", // kolom yang akan dihitung
          });

          // Data asisten sudah melebihi 3?
          if (countExistingAsisten >= 3) {
            return resError(
              400,
              `Tidak dapat menambahkan lebih dari 3 asisten pada jadwal praktikum dengan id ${praktikID} `,
              res
            );
          }

          // Data asisten belum melebihi 3?
          const newPiket = {
            praktik_id: dataPraktik.praktik_id,
            asisten_id,
          };

          await JadwalPiket.create(newPiket);
          return resSend(
            201,
            `Berhasil menambahkan jadwal piket baru untuk Asisten dengan id ${asisten_id} pada jadwal praktikum dengan id ${praktikID}`,
            newPiket,
            res
          );
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // GET All Jadwal Piket
  static async getAllPiket(req, res, next) {
    try {
      const dataPikets = await JadwalPiket.findAll({
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Piket kosong?
      if (dataPikets.length === 0) {
        return resError(404, "Data jadwal piket kosong", res);
      } else {
        return resSend(
          200,
          "Berhasil mendapatkan seluruh data jadwal piket",
          dataPikets,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // GET All Jadwal Piket By Praktik ID
  static async getPiketByPraktikId(req, res, next) {
    try {
      const praktikID = req.params.praktikID;

      const dataPikets = await JadwalPiket.findOne({
        where: {
          praktik_id: Number(praktikID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data jadwal praktik tidak ada?
      if (!dataPikets) {
        return resError(
          404,
          `Data jadwal piket dengan id ${praktikID} tidak ditemukan`,
          res
        );
      } else {
        resSend(
          200,
          `Berhasil mendapatkan data jadwal piket dengan praktik id ${praktikID}`,
          dataPikets,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // UPDATE Jadwal Piket By Piket ID
  static async updatePiketByPiketId(req, res, next) {
    try {
      const piketID = req.params.piketID;

      const { asisten_id } = req.body;

      const dataPiket = await JadwalPiket.findOne({
        where: {
          piket_id: Number(piketID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data jadwal piket tidak ada?
      if (!dataPiket) {
        return resError(
          404,
          `Data jadwal piket dengan id ${piketID} tidak ditemukan`,
          res
        );
      } else {
        // Apakah asisten_id sudah ada pada jadwal piket?
        const existingAsisten = await JadwalPiket.findOne({
          where: {
            praktik_id: Number(dataPiket.praktik_id),
            asisten_id,
          },
        });

        // Data asisten sudah ada pada jadwal praktikum tertentu?
        if (existingAsisten) {
          return resError(
            400,
            `Asisten dengan id ${asisten_id} sudah ada pada jadwal praktikum dengan id ${dataPiket.praktik_id}`,
            res
          );
        } else {
          dataPiket.asisten_id = asisten_id;
          await dataPiket.save();

          return resSend(
            200,
            `Berhasil mengubah asisten pada jadwal piket dengan id ${piketID}`,
            dataPiket,
            res
          );
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE Jadwal Piket By Praktik ID --> Menghapus semua jadwal piket yang ada pada jadwal praktikum id
  static async deletePiketByPraktikId(req, res, next) {
    try {
      const praktikID = req.params.praktikID;

      const dataPikets = await JadwalPiket.findAll({
        where: {
          praktik_id: Number(praktikID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data jadwal praktik tidak ada?
      if (!dataPikets || dataPikets.length === 0) {
        return resError(
          404,
          `Data jadwal piket dengan praktik id ${praktikID} tidak ditemukan`,
          res
        );
      } else {
        await JadwalPiket.destroy({
          where: {
            praktik_id: Number(praktikID),
          },
        });
        return resSend(
          200,
          `Berhasil menghapus semua data jadwal piket yang ada pada jadwal praktikum id ${praktikID}`,
          dataPikets,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE Jadwal Piket By Piket ID --> Menghapus hanya jadwal piket tertentu yang ada pada jadwal praktikum id
  static async deletePiketById(req, res, next) {
    try {
      const piketID = req.params.piketID;

      const dataPiket = await JadwalPiket.findOne({
        where: {
          piket_id: Number(piketID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Jadwal Piket tidak ada?
      if (!dataPiket) {
        return resError(
          404,
          `Data jadwal piket dengan id ${piketID} tidak ditemukan`,
          res
        );
      } else {
        await JadwalPiket.destroy({
          where: {
            piket_id: piketID,
          },
        });
        return resSend(
          200,
          `Berhasil menghapus data jadwal piket dengan id ${piketID}`,
          dataPiket,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = JadwalController;
