const { Asisten, JadwalPraktik, JadwalPiket } = require("../db/models");
const { resSend, resError } = require("../helpers/response");

class JadwalController {
  // Add Asisten
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
        // Mencari data asisten pada jadwal piket
        const dataAsisten = await JadwalPiket.findOne({
          where: {
            asisten_id,
          },
        });

        // Data asisten sudah ada pada jadwal?
        if (dataAsisten) {
          return resError(
            400,
            `Data Asisten sudah ada pada jadwal praktikum dengan id ${praktikID}`,
            res
          );
        } else {
          const newPiket = {
            praktik_id: dataPraktik?.praktik_id,
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

  // GET All Jadwal Praktik
  static async getAllPraktik(req, res, next) {
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

      // Data Piket kosong?
      if (dataPraktiks.length === 0) {
        return resError(404, "Data jadwal praktik kosong", res);
      } else {
        return resSend(
          200,
          "Berhasil mendapatkan jadwal praktik ",
          dataPraktiks,
          res
        );
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
          "Berhasil mendapatkan data jadwal piket",
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

      const dataPikets = await JadwalPiket.findAll({
        where: {
          praktik_id: Number(praktikID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data jadwal piket tidak ada?
      if (!dataPikets) {
        resError(
          404,
          `Data jadwal piket dengan praktik id ${praktikID} tidak ditemukan`,
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

  // UPDATE Jadwal Piket By Praktik ID
  static async updatePiketByPraktikId(req, res, next) {
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
        const dataAsisten = await Asisten.findOne({
          where: {
            asisten_id,
          },
        });

        // Data asisten sudah ada pada jadwal?
        if (dataAsisten) {
          return resError(
            400,
            `Data Asisten sudah ada pada jadwal praktikum dengan id ${praktikID}`,
            res
          );
        } else {
          const updatedPiket = {
            praktik_id: dataPraktik?.praktik_id,
            asisten_id,
          };
          await JadwalPiket.update(updatedPiket, {
            where: {
              praktik_id: Number(praktikID),
            },
          });
          return resSend(
            200,
            `Berhasil mengubah asisten pada jadwal praktikum dengan id ${praktikID}`,
            updatedPiket,
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

      const dataPiket = await JadwalPiket.findOne({
        where: {
          praktik_id: Number(praktikID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data jadwal praktik tidak ada?
      if (!dataPiket) {
        return resError(
          404,
          `Data jadwal piket dengan id ${praktikID} tidak ditemukan`,
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
          `Data jadwal piket dengan jadwal praktikum id ${praktikID} berhasil dihapus`,
          dataPiket,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE Jadwal Piket By Piket ID --> Menghapus hanya jadwal piket yang ada pada jadwal praktikum id
  static async deletePiketByPiketId(req, res, next) {
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

      // Data jadwal praktik tidak ada?
      if (!dataPiket) {
        return resError(
          404,
          `Data jadwal piket dengan id ${piketID} tidak ditemukan`,
          res
        );
      } else {
        await JadwalPiket.destroy({
          where: {
            piket_id: Number(piketID),
          },
        });
        return resSend(
          200,
          `Data jadwal piket dengan id ${piketID} berhasil dihapus`,
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
