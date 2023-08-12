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
        // Ada inputan pengganti_id
        if (pengganti_id) {
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
            "Status Izin atau Aplha memerlukan pengganti_id yang valid",
            res
          );
        }

        const newKehadiran = {
          piket_id: dataPiket.piket_id,
          pertemuan: dataPiket.pertemuan,
          asisten_id: dataPiket.asisten_id,
          pengganti_id: finalPenggantiID,
          // nama_asisten,
          status,
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

  // Get Kehadiran By Asisten Id
  static async getKehadiranByAslabID(req, res, next) {
    try {
      const aslabID = req.params.aslabID;

      const dataKehadirans = await Kehadiran.findAll({
        where: {
          asisten_id: aslabID,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Kehadiran tidak ada?
      if (dataKehadirans.length === 0) {
        return resError(
          404,
          `Data kehadiran dengan asisten id ${aslabID} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan data kehadiran asisten dengan id ${aslabID}`,
          dataKehadirans,
          res
        );
      }
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
