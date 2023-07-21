const SevimaHelper = require("../helpers/getDataSevima");
const {
  Mahasiswa,
  Dosen,
  Matkul,
  Kelas,
  JadwalPraktik,
} = require("../db/models");
const { resSend } = require("../helpers/response");

class SevimaController {
  // UPDATE Data Mahasiswa
  static async updateDataMahasiswa(req, res, next) {
    try {
      const mahasiswaArray = await SevimaHelper.getDosenIF();

      const isEmptyTableMahasiswa = (await Mahasiswa.count()) === 0;
      const responseArray = [];

      // Data Mahasiswa di database kosong?
      if (isEmptyTableMahasiswa) {
        const dataBaruMahasiswa = mahasiswaArray.map((item) => {
          return {
            nim: item.nip,
            nama_mahasiswa: item.nama,
            created_at: new Date(),
            updated_at: new Date(),
          };
        });

        await Mahasiswa.bulkCreate(dataBaruMahasiswa);

        responseArray.push({
          status: 201,
          message:
            "Data Mahasiswa dari SEVIMA API berhasil ditambahkan ke database",
          data: dataBaruMahasiswa,
        });

        return responseArray;
      } else {
        // Data Mahasiswa sudah ada di database
        for (const mahasiswa of mahasiswaArray) {
          // Cari data Mahasiswa berdasarkan nim
          const existingMahasiswa = await Mahasiswa.findOne({
            where: {
              nim: mahasiswa.nip,
            },
          });

          // NIM sudah ada? Lakukan pembaharuan data
          if (existingMahasiswa) {
            existingMahasiswa.nama_mahasiswa = mahasiswa.nama;

            await existingMahasiswa.save();

            responseArray.push({
              status: 200,
              message: `Data Mahasiswa dengan NIM ${mahasiswa.nip} berhasil diperbarui`,
              data: existingMahasiswa,
            });
          } else {
            // NIM belum ada? Tambahkan data baru
            const dataBaruMahasiswa = {
              nim: mahasiswa.nip,
              nama_mahasiswa: mahasiswa.nama,
              created_at: new Date(),
              updated_at: new Date(),
            };

            await Mahasiswa.create(dataBaruMahasiswa);

            responseArray.push({
              status: 201,
              message: `Data Mahasiswa baru dengan NIM ${mahasiswa.nip} berhasil ditambahkan`,
              data: dataBaruMahasiswa,
            });
          }
        }
        return responseArray;
      }
    } catch (error) {
      next(error);
    }
  }

  // UPDATE Data Dosen
  static async updateDataDosen(req, res, next) {
    try {
      const dosenArray = await SevimaHelper.getDosenIF();

      const isEmptyTableDosen = (await Dosen.count()) === 0;
      const responseArray = [];

      // Data dosen di database kosong?
      if (isEmptyTableDosen) {
        const dataBaruDosen = dosenArray.map((item) => {
          return {
            dosen_nip: item.nip,
            nama_dosen: item.nama,
            email: item.email,
            jenis_pegawai: item.jenispegawai,
            created_at: new Date(),
            updated_at: new Date(),
          };
        });

        await Dosen.bulkCreate(dataBaruDosen);

        responseArray.push({
          status: 201,
          message:
            "Data Dosen dari SEVIMA API berhasil ditambahkan ke database",
          data: dataBaruDosen,
        });

        return responseArray;
      } else {
        // Data dosen sudah ada di database
        for (const dosen of dosenArray) {
          // Cari data dosen berdasarkan nip
          const existingDosen = await Dosen.findOne({
            where: {
              dosen_nip: dosen.nip,
            },
          });

          // NIP sudah ada? Lakukan pembaharuan data
          if (existingDosen) {
            existingDosen.nama_dosen = dosen.nama;
            existingDosen.email = dosen.email;
            existingDosen.jenis_pegawai = dosen.jenispegawai;

            await existingDosen.save();

            responseArray.push({
              status: 200,
              message: `Data dosen dengan NIP ${dosen.nip} berhasil diperbarui`,
              data: existingDosen,
            });
          } else {
            // NIP belum ada? Tambahkan data baru
            const dataBaruDosen = {
              dosen_nip: dosen.nip,
              nama_dosen: dosen.nama,
              email: dosen.email,
              jenis_pegawai: dosen.jenispegawai,
              created_at: new Date(),
              updated_at: new Date(),
            };

            await Dosen.create(dataBaruDosen);

            responseArray.push({
              status: 201,
              message: `Data dosen baru dengan NIP ${dosen.nip} berhasil ditambahkan`,
              data: dataBaruDosen,
            });
          }
        }
        return responseArray;
      }
    } catch (error) {
      next(error);
    }
  }

  // UPDATE Data Matkul
  static async updateDataMatkul(req, res, next) {
    try {
      const matkulArray = await SevimaHelper.getMatkulPrak();

      const isEmptyTableMatkul = (await Matkul.count()) === 0;
      const responseArray = [];

      // Data matkul di database kosong?
      if (isEmptyTableMatkul) {
        const dataBaruMatkul = matkulArray.map((item) => {
          return {
            kode_mk: item.kodemk,
            nama_mk: item.namamk,
            kurikulum: item.kurikulum,
            sks_mk: item.sksmk,
            created_at: new Date(),
            updated_at: new Date(),
          };
        });

        await Matkul.bulkCreate(dataBaruMatkul);

        responseArray.push({
          status: 201,
          message:
            "Data mata kuliah dari SEVIMA API berhasil ditambahkan ke database",
          data: dataBaruMatkul,
        });

        return responseArray;
      } else {
        // Data matkul sudah ada di database
        for (const matkul of matkulArray) {
          // Cari data matkul berdasarkan kode_mk
          const existingMatkul = await Matkul.findOne({
            where: {
              kode_mk: matkul.kodemk,
            },
          });

          // Kode MK sudah ada? Lakukan pembaharuan data
          if (existingMatkul) {
            existingMatkul.nama_mk = matkul.namamk;
            existingMatkul.kurikulum = matkul.kurikulum;
            existingMatkul.sks_mk = matkul.sksmk;

            await existingMatkul.save();

            responseArray.push({
              status: 200,
              message: `Data mata kuliah dengan kode mk ${matkul.kodemk} berhasil diperbarui`,
              data: existingMatkul,
            });
          } else {
            // Kode mk belum ada? Tambahkan data baru
            const dataBaruMatkul = {
              kode_mk: matkul.kodemk,
              nama_mk: matkul.namamk,
              kurikulum: matkul.kurikulum,
              sks_mk: matkul.sksmk,
              created_at: new Date(),
              updated_at: new Date(),
            };

            await Matkul.create(dataBaruMatkul);

            responseArray.push({
              status: 201,
              message: `Data mata kuliah baru dengan kode mk ${matkul.kodemk} berhasil ditambahkan`,
              data: dataBaruMatkul,
            });
          }
        }

        return responseArray;
      }
    } catch (error) {
      next(error);
    }
  }

  // UPDATE Data Kelas
  static async updateDataKelas(req, res, next) {
    try {
      const kelasArray = await SevimaHelper.getKelasPrak();

      const isEmptyTableKelas = (await Kelas.count()) === 0;
      const responseArray = [];

      // Mencari data mata kuliah dan diambil kode_mk saja
      const matkulList = await Matkul.findAll({
        attributes: ["kode_mk"],
      });

      // Membuat array baru dari matkulList (kode_mk di tabel matkul)
      const kodeMKList = matkulList.map((matkul) => matkul.kode_mk);
      /*
       [
         'IF21W0407', 'IF21W0408', 'IF21W0608', 'IF21W0609', 'IF21W0610', 'IF21W0308', 'IF21W0507', 'IF21W0506', 'IF21W0307', 'IF21W0607', 'IF21W0508'
       ]
     */

      // Mengambil data yang kodemk nya cocok dengan data kodeMKList
      const filteredData = kelasArray.filter((item) =>
        kodeMKList.find((kodeMK) => kodeMK === item.kodemk)
      );

      // Data kelas di database kosong?
      if (isEmptyTableKelas) {
        const dataBaruKelas = filteredData.map((item) => {
          return {
            kelas_id: item.kelasid,
            nama_kelas: item.namakelas,
            nama_ruang: item.namaruang,
            kapasitas: item.kapasitas,
            kode_mk: item.kodemk,
            created_at: new Date(),
            updated_at: new Date(),
          };
        });

        await Kelas.bulkCreate(dataBaruKelas);

        responseArray.push({
          status: 201,
          message:
            "Data kelas dari SEVIMA API berhasil ditambahkan ke database",
          data: dataBaruKelas,
        });

        return responseArray;
      } else {
        // Data kelas sudah ada di database
        for (const kelas of filteredData) {
          // Cari data kelas berdasarkan kelasid
          const existingKelas = await Kelas.findOne({
            where: {
              kelas_id: kelas.kelasid,
            },
          });
          // Kelas id sudah ada? Lakukan pembaharuan data
          if (existingKelas) {
            existingKelas.nama_kelas = kelas.namakelas;
            existingKelas.nama_ruang = kelas.namaruang;
            existingKelas.kapasitas = kelas.kapasitas;
            existingKelas.kode_mk = kelas.kodemk;

            await existingKelas.save();

            responseArray.push({
              status: 200,
              message: `Data kelas dengan Kelas ID ${kelas.kelasid} berhasil diperbarui`,
              data: existingKelas,
            });
          } else {
            // Kelas id belum ada? Tambahkan data baru
            const dataBaruKelas = {
              kelas_id: kelas.kelasid,
              nama_kelas: kelas.namakelas,
              nama_ruang: kelas.namaruang,
              kapasitas: kelas.kapasitas,
              kode_mk: kelas.kodemk,
              created_at: new Date(),
              updated_at: new Date(),
            };

            await Kelas.create(dataBaruKelas);
            responseArray.push({
              status: 201,
              message: `Data kelas baru dengan Kelas ID ${kelas.kelasid} berhasil ditambahkan`,
              data: dataBaruKelas,
            });
          }
        }

        return responseArray;
      }
    } catch (error) {
      next(error);
    }
  }

  // UPDATE All Data
  static async updateAllDataFromSevima(req, res, next) {
    try {
      // Dosen
      const responseArrayMahasiswa = [];
      const dataMahasiswa = await SevimaController.updateDataMahasiswa(
        req,
        res,
        next
      );
      responseArrayMahasiswa.push(...dataMahasiswa);

      // Dosen
      const responseArrayDosen = [];
      const dataDosen = await SevimaController.updateDataDosen(req, res, next);
      responseArrayDosen.push(...dataDosen);

      // Mata Kuliah
      const responseArrayMatkul = [];
      const dataMatkul = await SevimaController.updateDataMatkul(
        req,
        res,
        next
      );
      responseArrayMatkul.push(...dataMatkul);

      // Kelas
      const responseArrayKelas = [];
      const dataKelas = await SevimaController.updateDataKelas(req, res, next);
      responseArrayKelas.push(...dataKelas);

      resSend(
        200,
        "Pembaruan data dari SEVIMA berhasil",
        {
          mahasiswa: responseArrayMahasiswa,
          dosen: responseArrayDosen,
          matkul: responseArrayMatkul,
          kelas: responseArrayKelas,
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SevimaController;
