const { Matkul, Kelas, Mahasiswa, Krs, Penilaian } = require("../db/models");
const { resError, resSend } = require("../helpers/response");

class PenilaianController {
  // GET Praktikan Kelas ID
  static async getAllPraktikanByKelasId(req, res, next) {
    try {
      const kelasID = req.params.kelasID;

      const dataKRS = await Krs.findAll({
        where: {
          kelas_id: kelasID,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
        include: {
          model: Mahasiswa,
          attributes: ["nama_mahasiswa"],
        },
      });

      // Data KRS kosong?
      if (dataKRS.length === 0) {
        return resError(
          404,
          `Data Praktikan dengan kelas id ${kelasID} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan data Praktikan pada kelas id ${kelasID}`,
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

  // GET Praktikan Periode KRS Kelas ID
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

  // GET Praktikan Periode KRS Kode MK
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
}

module.exports = PenilaianController;
