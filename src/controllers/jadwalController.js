const { Asisten, JadwalPraktik, JadwalPiket } = require("../db/models");
const { resSend, resError } = require("../helpers/response");

class JadwalController {
  // GET All Jadwal Praktik By Periode
  static async getAllPraktikByPeriode(req, res, next) {
    try {
      const { periode } = req.body;

      const dataPraktiks = await JadwalPraktik.findAll({
        where: {
          periode,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Praktik kosong?
      if (dataPraktiks.length === 0) {
        return resError(
          404,
          `Data jadwal praktik dengan periode ${periode} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan seluruh data jadwal praktikum dengan periode ${periode}`,
          dataPraktiks,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

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
            `Berhasil menambahkan jadwal piket baru periode ${periode} untuk Asisten dengan id ${asisten_id} pada kelas id ${kelasID}`,
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
          `Data jadwal piket dengan periode ${periode} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan seluruh data jadwal piket dengan periode ${periode}`,
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
          `Data jadwal piket periode ${periode} dengan kelas id ${kelasID} tidak ditemukan`,
          res
        );
      } else {
        resSend(
          200,
          `Berhasil mendapatkan seluruh data jadwal piket periode ${periode} dengan kelas id ${kelasID}`,
          dataPikets,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // UPDATE Jadwal Piket By Kelas ID dan Asisten ID
  static async updatePiketByKelasAslabID(req, res, next) {
    try {
      const kelasID = req.params.kelasID;
      const asistenID = req.params.asistenID;
      const { periode } = req.body;

      // Mencari kelas id yang ada pada jadwal piket
      const dataPikets = await JadwalPiket.findAll({
        where: {
          periode,
          kelas_id: Number(kelasID),
          asisten_id: asistenID,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data jadwal piket tidak ada?
      if (dataPikets.length === 0) {
        return resError(
          404,
          `Data jadwal piket periode ${periode} dengan kelas id ${kelasID} dan asisten id ${asistenID} tidak ditemukan`,
          res
        );
      } else {
        const { asisten_id, periode } = req.body;

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
            `Data Asisten dengan id ${asistenID} tidak ditemukan`,
            res
          );
        } else {
          // Apakah asisten sudah terdaftar pada jadwal piket?
          const existingAsisten = await JadwalPiket.findOne({
            where: {
              periode,
              kelas_id: Number(kelasID),
              asisten_id,
            },
          });

          // Data asisten sudah terdaftar?
          if (existingAsisten) {
            return resError(
              400,
              `Asisten dengan id ${asisten_id} sudah terdaftar pada jadwal piket periode ${periode} dengan kelas id ${kelasID}`,
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
                  kelas_id: Number(kelasID),
                  asisten_id: asistenID,
                },
              }
            );

            return resSend(
              200,
              `Berhasil mengubah jadwal piket periode ${periode} pada kelas id ${kelasID} dan asisten dengan id ${asistenID}`,
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
          `Data jadwal piket periode ${periode} dengan kelas id ${kelasID} tidak ditemukan`,
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
          `Berhasil menghapus semua data jadwal piket periode ${periode} yang ada pada kelas id ${kelasID}`,
          dataPikets,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE Data Jadwal Piket by Asisten ID --> Menghapus semua jadwal piket yang ada pada asisten id
  static async deletePiketByByKelasAslabID(req, res, next) {
    try {
      const kelasID = req.params.kelasID;
      const asistenID = req.params.asistenID;
      const { periode } = req.body;

      // Mencari kelas id yang ada pada jadwal piket
      const dataPikets = await JadwalPiket.findAll({
        where: {
          periode,
          kelas_id: Number(kelasID),
          asisten_id: asistenID,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data jadwal piket tidak ada?
      if (dataPikets.length === 0) {
        return resError(
          404,
          `Data jadwal piket periode ${periode} dengan kelas id ${kelasID} dan asisten id ${asistenID} tidak ditemukan`,
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
            kelas_id: Number(kelasID),
            asisten_id: asistenID,
          },
        });
        return resSend(
          200,
          `Berhasil menghapus jadwal piket periode ${periode} dengan kelas id ${kelasID} dan asisten dengan id ${asistenID}`,
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
