const { Asisten, JadwalPiket, Kehadiran } = require("../db/models");
const { resSend, resError } = require("../helpers/response");

class KehadiranController {
  // Add New Kehadiran By Piket Id
  static async addKehadiranByPiketId(req, res, next) {
    try {
      const piketID = req.params.piketID;
      const { status, pengganti_id } = req.body;

      const dataPiket = await JadwalPiket.findOne({
        where: {
          piket_id: Number(piketID),
        },
      });

      // Data piket tidak ada?
      if (!dataPiket) {
        return resError(
          404,
          `Data jadwal piket dengan id ${piketID} tidak ditemukan`,
          res
        );
      }

      // Memeriksa data kehadiran dengan piketID yang sama
      const existingAbsen = await Kehadiran.findOne({
        where: {
          piket_id: Number(piketID),
        },
      });

      // Data kehadiran sudah ada?
      if (existingAbsen) {
        return resError(
          400,
          `Data kehadiran pada jadwal piket dengan id ${piketID} sudah ada`,
          res
        );
      } else {
        let penggantiAslab;
        let namaPengganti;

        // Ada inputan pengganti_id
        if (pengganti_id) {
          // Mencegah pengganti_id diisi dengan data asisten pada jadwal piket
          if (pengganti_id === dataPiket.asisten_id) {
            return resError(
              400,
              "Pengganti ID tidak bisa sama dengan Asisten ID yang tidak hadir",
              res
            );
          }

          // Apakah pengganti_id ada di data Asisten?
          penggantiAslab = await Asisten.findOne({
            where: { asisten_id: pengganti_id },
          });

          // Data Pengganti tidak ada?
          if (!penggantiAslab) {
            return resError(
              404,
              `Data Asisten dengan id ${pengganti_id} tidak ditemukan`,
              res
            );
          } else {
            // Data Pengganti ada? Set namaPengganti sesuai dengan pengganti_id
            namaPengganti = penggantiAslab.nama_asisten;
          }
        }

        // Jika status kehadiran "Izin" atau "Alpha" dan penggantiAslab true (ada pada data asisten), maka pengganti_id dimasukan
        // Jika tidak pengganti_id akan null
        const finalPenggantiID =
          (status === "Izin" || status === "Alpha") && penggantiAslab
            ? pengganti_id
            : null;

        // Jika status kehadiran "Izin" atau "Alpha", pengganti_id tidak boleh null
        if ((status === "Izin" || status === "Alpha") && !finalPenggantiID) {
          return resError(
            400,
            "Status Izin atau Alpha memerlukan pengganti_id yang valid",
            res
          );
        }

        const newKehadiran = {
          piket_id: dataPiket.piket_id,
          pertemuan: dataPiket.pertemuan,
          asisten_id: dataPiket.asisten_id,
          nama_asisten: dataPiket.nama_asisten,
          status,
          pengganti_id: finalPenggantiID,
          // Jika asisten hadir, set nama_pengganti null
          nama_pengganti: status === "Hadir" ? null : namaPengganti,
        };

        await Kehadiran.create(newKehadiran);

        return resSend(
          201,
          `Berhasil menambahkan kehadiran baru pada jadwal piket dengan id ${piketID}`,
          newKehadiran,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // Get All Kehadiran
  static async getAllKehadiranByPeriode(req, res, next) {
    try {
      const { periode } = req.body;

      const dataPiket = await JadwalPiket.findAll({
        where: {
          periode,
        },
      });

      // Data Jadwal Piket tidak ada?
      if (dataPiket.length === 0) {
        return resError(
          404,
          `Data jadwal piket periode ${periode} tidak ditemukan`,
          res
        );
      }

      // Mengumpulkan piket_id yang ditemukan pada jadwal piket sesuai dengan periode
      const piketIDs = dataPiket.map((piket) => piket.piket_id);

      const dataKehadirans = await Kehadiran.findAll({
        where: {
          piket_id: piketIDs,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Kehadiran tidak ada?
      if (dataKehadirans.length === 0) {
        return resError(
          404,
          `Data kehadiran untuk jadwal piket periode ${periode} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan seluruh data kehadiran untuk jadwal piket periode ${periode}`,
          dataKehadirans,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // Get Kehadiran By Asisten Id
  static async getAllKehadiranByAslabID(req, res, next) {
    try {
      const asistenID = req.params.asistenID;
      const { periode } = req.body;

      const dataPiket = await JadwalPiket.findAll({
        where: {
          periode,
          asisten_id: asistenID,
        },
      });

      // Data Jadwal Piket tidak ada?
      if (dataPiket.length === 0) {
        return resError(
          404,
          `Data jadwal piket periode ${periode} dengan asisten id ${asistenID} tidak ditemukan`,
          res
        );
      }

      // Mengumpulkan piket_id yang ditemukan pada jadwal piket sesuai dengan periode dan asisten_id
      const piketIDs = dataPiket.map((piket) => piket.piket_id);

      const dataKehadirans = await Kehadiran.findAll({
        where: {
          piket_id: piketIDs,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Kehadiran tidak ada?
      if (dataKehadirans.length === 0) {
        return resError(
          404,
          `Data kehadiran untuk jadwal piket periode ${periode} dengan asisten id ${asistenID} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan data kehadiran untuk jadwal piket periode ${periode} dengan asisten dengan id ${asistenID}`,
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
      const { status, pengganti_id } = req.body;

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
        let penggantiAslab;
        let namaPengganti;

        // Jika ada pengganti yang akan diupdate
        if (pengganti_id) {
          // Mencegah pengganti_id diisi dengan data asisten pada jadwal piket
          if (pengganti_id === dataKehadiran.asisten_id) {
            return resError(
              400,
              "Pengganti ID tidak bisa sama dengan Asisten ID yang tidak hadir",
              res
            );
          }

          // Apakah pengganti_id ada di data Asisten?
          penggantiAslab = await Asisten.findOne({
            where: { asisten_id: pengganti_id },
          });

          // Data Pengganti tidak ada?
          if (!penggantiAslab) {
            return resError(
              404,
              `Data Asisten dengan id ${pengganti_id} tidak ditemukan`,
              res
            );
          } else {
            // Data Pengganti ada? Set namaPengganti sesuai dengan pengganti_id
            namaPengganti = penggantiAslab.nama_asisten;
          }
        }

        // Jika status kehadiran "Hadir" pengganti_id akan null
        // Jika tidak, akan diisi dengan pengganti_id
        let finalPenggantiID = status === "Hadir" ? null : pengganti_id;

        // Jika status kehadiran "Hadir" dan update menjadi "Izin" atau "Alpha", pengganti_id tidak boleh null
        if (
          dataKehadiran.status === "Hadir" &&
          (status === "Izin" || status === "Alpha") &&
          !finalPenggantiID
        ) {
          return resError(
            400,
            "Status Izin atau Alpha memerlukan pengganti_id yang valid",
            res
          );
        }

        const updatedKehadiran = {
          pengganti_id: finalPenggantiID,
          nama_pengganti: status === "Hadir" ? null : namaPengganti,
          status,
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
