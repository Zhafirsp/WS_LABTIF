const { Op } = require("sequelize");
const { Matkul, Kelas, Mahasiswa, Krs, Penilaian } = require("../db/models");
const { resError, resSend } = require("../helpers/response");

class PenilaianController {
  // Add New Penilaian
  static async addNewNilaiByKrsId(req, res, next) {
    try {
      const krsID = req.params.krsID;
      const { cpmk, tugas_ke, nilai } = req.body;

      const dataKRS = await Krs.findOne({
        where: {
          krs_id: Number(krsID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
        include: {
          model: Mahasiswa,
          attributes: ["nama_mahasiswa"],
        },
      });

      // Data KRS tidak ada?
      if (!dataKRS) {
        return resError(
          404,
          `Data Praktikan dengan krs id ${krsID} tidak ditemukan`,
          res
        );
      }

      // Data cpmk kosong?
      if (!cpmk) {
        return resError(400, "Data CPMK tidak boleh kosong", res);
      }
      // Data tugas kosong?
      else if (!tugas_ke) {
        return resError(400, "Data keterangan tugas tidak boleh kosong", res);
      }
      // Data nilai kosong?
      else if (!nilai) {
        return resError(400, "Data nilai tidak boleh kosong", res);
      }

      // Data KRS ada? lakukan pemeriksaan data nilai untuk mencegah duplikasi data nilai pada tugas-ke dengan cpmk yang sama
      const nilaiExist = await Penilaian.findOne({
        where: {
          krs_id: Number(krsID),
          cpmk,
          tugas_ke,
        },
      });

      // Data nilai sudah ada pada krs ID?
      if (nilaiExist) {
        return resError(
          400,
          `Data penilaian untuk cpmk ${cpmk} dan tugas ke-${tugas_ke} sudah ada pada krs id ${krsID}`,
          res
        );
      }

      const newNilai = {
        kelas_id: dataKRS.kelas_id,
        krs_id: dataKRS.krs_id,
        nim: dataKRS.nim,
        nama_mahasiswa: dataKRS.Mahasiswa.nama_mahasiswa,
        cpmk,
        tugas_ke,
        nilai,
      };

      await Penilaian.create(newNilai);

      return resSend(
        201,
        `Berhasil menambahkan data penilaian baru pada krs id ${krsID}`,
        newNilai,
        res
      );
    } catch (error) {
      next(error);
    }
  }

  // GET All NIlai By Kelas ID
  static async getAllNilaiByKelasId(req, res, next) {
    try {
      const kelasID = req.params.kelasID;

      const dataNilai = await Penilaian.findAll({
        where: {
          kelas_id: Number(kelasID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
        order: [
          // Menurutkan data dari terkecil ke terbesar
          ["nim", "ASC"],
          ["cpmk", "ASC"],
          ["tugas_ke", "ASC"],
        ],
      });

      // Data Nilai kosong?
      if (dataNilai.length === 0) {
        return resError(
          404,
          `Data nilai dengan kelas id ${kelasID} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan data nilai pada kelas id ${kelasID}`,
          dataNilai,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // GET Nilai By KRS ID
  static async getNilaiByKrsId(req, res, next) {
    try {
      const krsID = req.params.krsID;

      const dataNilai = await Penilaian.findAll({
        where: {
          krs_id: Number(krsID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
        order: [
          // Menurutkan data dari terkecil ke terbesar
          ["cpmk", "ASC"],
          ["tugas_ke", "ASC"],
        ],
      });

      // Data Nilai kosong?
      if (dataNilai.length === 0) {
        return resError(
          404,
          `Data nilai dengan krs id ${krsID} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan seluruh data nilai pada krs id ${krsID}`,
          dataNilai,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // UPDATE Nilai By Nilai ID
  static async updateNilaiById(req, res, next) {
    try {
      const nilaiID = req.params.id;

      const { cpmk, tugas_ke, nilai } = req.body;

      const dataNilai = await Penilaian.findOne({
        where: {
          nilai_id: Number(nilaiID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data nilai ada?
      if (!dataNilai) {
        return resError(
          404,
          `Data nilai dengan id ${nilaiID} tidak ditemukan`,
          res
        );
      }

      // Mencegah duplikasi jika ada perubahan cpmk atau tugas-ke
      if (cpmk !== dataNilai.cpmk || tugas_ke !== dataNilai.tugas_ke) {
        const existingNilai = await Penilaian.findOne({
          where: {
            krs_id: dataNilai.krs_id,
            cpmk,
            tugas_ke,
          },
        });

        if (existingNilai) {
          return resError(
            400,
            `Data nilai untuk cpmk ${cpmk} dan tugas-ke${tugas_ke} sudah ada pada krs dengan id ${existingNilai.nilai_id}`,
            res
          );
        }
      }

      dataNilai.cpmk = cpmk;
      dataNilai.tugas_ke = tugas_ke;
      dataNilai.nilai = nilai;

      await dataNilai.save();

      return resSend(
        200,
        `Berhasil mengubah data nilai dengan id ${nilaiID}`,
        dataNilai,
        res
      );
    } catch (error) {
      next(error);
    }
  }

  // DELETE Nilai By KRS ID
  static async deleteNilaiByKrsId(req, res, next) {
    try {
      const krsID = req.params.krsID;

      const dataNilai = await Penilaian.findAll({
        where: {
          krs_id: Number(krsID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
        order: [
          // Menurutkan data dari terkecil ke terbesar
          ["cpmk", "ASC"],
          ["tugas_ke", "ASC"],
        ],
      });

      // Data Nilai kosong?
      if (dataNilai.length === 0) {
        return resError(
          404,
          `Data nilai dengan krs id ${krsID} tidak ditemukan`,
          res
        );
      } else {
        await Penilaian.destroy({
          where: {
            krs_id: Number(krsID),
          },
        });
        return resSend(
          200,
          `Berhasil menghapus seluruh data nilai pada krs id ${krsID}`,
          dataNilai,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PenilaianController;
