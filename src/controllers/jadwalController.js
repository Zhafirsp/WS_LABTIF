const { Asisten, JadwalPraktik, JadwalPiket } = require("../db/models");
const { resSend, resError } = require("../helpers/response");

class JadwalController {
  // Add New Jadwal Piket By Kelas ID
  static async addPiketByKelasId(req, res, next) {
    try {
      const kelasID = req.params.kelasID;

      const { periode, asisten_id } = req.body;

      /*
       Berdasarkan kelas id alasannya:
       1. Jadwal id unik untuk setiap pertemuan
       2. Kode Mk memiliki beberapa jadwal 
      */

      // Mencari kelas id yang ada pada jadwal praktik
      const dataPraktiks = await JadwalPraktik.findOne({
        where: {
          periode,
          kelas_id: Number(kelasID),
        },
      });

      // Data kelas tidak ada?
      if (!dataPraktiks) {
        return resError(
          404,
          `Data jadwal praktikum periode ${periode} dengan kelas id ${kelasID} tidak ditemukan`,
          res
        );
      } else {
        // Apakah data asisten ada pada tabel Asisten?
        const dataAsisten = await Asisten.findOne({
          where: {
            asisten_id,
          },
        });

        // Data Asisten tidak ada?
        if (!dataAsisten) {
          return resError(
            404,
            `Data Asisten dengan id ${asisten_id} tidak ditemukan`,
            res
          );
        } else {
          // Apakah asisten sudah terdaftar pada jadwal piket?
          const existingPiket = await JadwalPiket.findOne({
            where: {
              periode,
              kelas_id: Number(kelasID),
              asisten_id,
            },
            attributes: {
              exclude: ["created_at", "updated_at"],
            },
          });

          // Data asisten sudah terdaftar?
          if (existingPiket) {
            return resError(
              400,
              `Asisten dengan id ${asisten_id} sudah terdaftar pada jadwal praktikum periode ${periode} dengan kelas id ${kelasID}`,
              res
            );
          }

          // Mencari data praktik_id yang ada pada kelas_id tersebut
          const praktikIDs = await JadwalPraktik.findAll({
            where: {
              periode,
              kelas_id: Number(kelasID),
            },
            attributes: ["praktik_id", "periode", "kelas_id", "pertemuan"],
          });

          // Hitung asisten yang sudah ada pada jadwal praktikum tersebut
          const countExistingAsisten = await JadwalPiket.count({
            where: {
              praktik_id: praktikIDs.map((praktik) => praktik.praktik_id),
            },
            distinct: true, // data unik saja yang akan dihitung
            col: "asisten_id", // kolom yang akan dihitung
          });

          // Data asisten sudah melebihi 3?
          if (countExistingAsisten + 1 > 3) {
            return resError(
              400,
              `Tidak dapat menambahkan lebih dari 3 asisten pada setiap praktikum dalam kelas dengan id ${kelasID}`,
              res
            );
          }

          // Data asisten belum melebihi 3?
          // Menambahkan jadwal piket baru untuk setiap praktik_id dalam kelas
          const newPiket = praktikIDs.map((praktik) => ({
            praktik_id: praktik.praktik_id,
            pertemuan: praktik.pertemuan,
            periode: praktik.periode,
            kelas_id: praktik.kelas_id,
            asisten_id,
            nama_asisten: dataAsisten.nama_asisten,
          }));

          await JadwalPiket.bulkCreate(newPiket);
          return resSend(
            201,
            `Berhasil menambahkan jadwal piket asisten baru periode ${periode} untuk Asisten dengan id ${asisten_id} pada kelas id ${kelasID}`,
            newPiket,
            res
          );
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // GET All Jadwal Piket By Periode
  static async getAllPiketByPeriode(req, res, next) {
    try {
      const { periode } = req.body;

      const dataPikets = await JadwalPiket.findAll({
        where: {
          periode,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Piket kosong?
      if (dataPikets.length === 0) {
        return resError(
          404,
          `Data jadwal piket asisten dengan periode ${periode} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan seluruh data jadwal piket asisten dengan periode ${periode}`,
          dataPikets,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // GET All Jadwal Piket By Kelas ID
  static async getPiketByKelasId(req, res, next) {
    try {
      const kelasID = req.params.kelasID;
      const { periode } = req.body;

      const dataPikets = await JadwalPiket.findAll({
        where: {
          periode,
          kelas_id: Number(kelasID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data jadwal piket tidak ada?
      if (dataPikets.length === 0) {
        return resError(
          404,
          `Data jadwal piket asisten periode ${periode} dengan kelas id ${kelasID} tidak ditemukan`,
          res
        );
      } else {
        resSend(
          200,
          `Berhasil mendapatkan seluruh data jadwal piket asisten periode ${periode} dengan kelas id ${kelasID}`,
          dataPikets,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // UPDATE Jadwal Piket By Asisten ID
  static async updatePiketByAslabId(req, res, next) {
    try {
      const aslabID = req.params.aslabID;
      const { kelas_id, periode } = req.body;

      // Mencari kelas id yang ada pada jadwal piket
      const dataPikets = await JadwalPiket.findAll({
        where: {
          periode,
          kelas_id,
          asisten_id: aslabID,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data jadwal piket tidak ada?
      if (dataPikets.length === 0) {
        return resError(
          404,
          `Data jadwal piket asisten periode ${periode} dengan kelas id ${kelas_id} dan asisten id ${aslabID} tidak ditemukan`,
          res
        );
      } else {
        const { asisten_id } = req.body;

        // Apakah data asisten ada pada tabel Asisten?
        const dataAsisten = await Asisten.findOne({
          where: {
            asisten_id,
          },
        });

        // Data Asisten tidak ada?
        if (!dataAsisten) {
          return resError(
            404,
            `Data Asisten dengan id ${asisten_id} tidak ditemukan`,
            res
          );
        } else {
          // Apakah asisten sudah terdaftar pada jadwal piket?
          const existingAsisten = await JadwalPiket.findOne({
            where: {
              periode,
              kelas_id,
              asisten_id,
            },
          });

          // Data asisten sudah terdaftar?
          if (existingAsisten) {
            return resError(
              400,
              `Asisten dengan id ${asisten_id} sudah terdaftar pada jadwal piket periode ${periode} dengan kelas id ${kelas_id}`,
              res
            );
          } else {
            // Data asisten belum ada pada jadwal piket?
            const updatedPiket = dataPikets.map((piket) => ({
              periode: piket.periode,
              piket_id: piket.piket_id,
              praktik_id: piket.praktik_id,
              asisten_id,
              nama_asisten: dataAsisten.nama_asisten,
            }));

            // Melakukan perubahan asisten pada jadwal piket berdasarkan kelas_id
            await JadwalPiket.update(
              {
                asisten_id,
                nama_asisten: dataAsisten.nama_asisten,
              },
              {
                where: {
                  periode,
                  kelas_id,
                  asisten_id: aslabID,
                },
              }
            );

            return resSend(
              200,
              `Berhasil mengubah jadwal piket asisten periode ${periode} pada kelas id ${kelas_id} dan asisten dengan id ${aslabID}`,
              updatedPiket,
              res
            );
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE Jadwal Piket By Kelas ID --> Menghapus semua jadwal piket yang ada pada kelas id
  static async deletePiketByKelasId(req, res, next) {
    try {
      const kelasID = req.params.kelasID;
      const { periode } = req.body;

      const dataPikets = await JadwalPiket.findAll({
        where: {
          periode,
          kelas_id: Number(kelasID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data jadwal kelas tidak ada?
      if (dataPikets.length === 0) {
        return resError(
          404,
          `Data jadwal piket asisten periode ${periode} dengan kelas id ${kelasID} tidak ditemukan`,
          res
        );
      } else {
        await JadwalPiket.destroy({
          where: {
            periode,
            kelas_id: Number(kelasID),
          },
        });
        return resSend(
          200,
          `Berhasil menghapus semua data jadwal piket asisten periode ${periode} pada kelas id ${kelasID}`,
          dataPikets,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE Data Jadwal Piket by Asisten ID --> Menghapus semua jadwal piket yang ada pada asisten id
  static async deletePiketByAslabId(req, res, next) {
    try {
      const aslabID = req.params.aslabID;
      const { kelas_id, periode } = req.body;

      // Mencari kelas id yang ada pada jadwal piket
      const dataPikets = await JadwalPiket.findAll({
        where: {
          periode,
          kelas_id,
          asisten_id: aslabID,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data jadwal piket tidak ada?
      if (dataPikets.length === 0) {
        return resError(
          404,
          `Data jadwal piket asisten periode ${periode} dengan kelas id ${kelas_id} dan asisten id ${aslabID} tidak ditemukan`,
          res
        );
      } else {
        const deletedPiket = dataPikets.map((piket) => ({
          periode: piket.periode,
          piket_id: piket.piket_id,
          praktik_id: piket.praktik_id,
          asisten_id: piket.asisten_id,
          nama_asisten: piket.nama_asisten,
        }));

        await JadwalPiket.destroy({
          where: {
            periode,
            kelas_id,
            asisten_id: aslabID,
          },
        });
        return resSend(
          200,
          `Berhasil menghapus jadwal piket asisten periode ${periode} dengan kelas id ${kelas_id} dan asisten dengan id ${aslabID}`,
          deletedPiket,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = JadwalController;
