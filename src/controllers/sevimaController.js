const SevimaHelper = require("../helpers/getDataSevima");
const {
  Mahasiswa,
  Dosen,
  Matkul,
  Kelas,
  JadwalPraktik,
} = require("../db/models");
const { resSend, resError } = require("../helpers/response");

class SevimaController {
  // UPDATE Data Mahasiswa
  static async updateDataMahasiswa(req, res, next) {
    try {
      const { periode, limit } = req.body;

      const mahasiswaArray = await SevimaHelper.getMahasiswaIF(periode, limit);
      const isEmptyTableMahasiswa = (await Mahasiswa.count()) === 0;

      const responseArray = [];

      // Data Mahasiswa di database kosong?
      if (isEmptyTableMahasiswa) {
        const dataBaruMahasiswa = mahasiswaArray.map((item) => {
          return {
            nim: item.nim,
            nama_mahasiswa: item.nama,
            email: item.email,
            no_hp: item.nohp,
            periode_masuk: item.periodemasuk,
            created_at: new Date(),
            updated_at: new Date(),
          };
        });

        await Mahasiswa.bulkCreate(dataBaruMahasiswa);

        responseArray.push({
          status: 200,
          message:
            "Data Mahasiswa dari SEVIMA API berhasil ditambahkan ke database",
          data: dataBaruMahasiswa,
        });
      } else {
        for (const mahasiswa of mahasiswaArray) {
          // Cari data Mahasiswa berdasarkan nim
          const existingMahasiswa = await Mahasiswa.findOne({
            where: {
              nim: mahasiswa.nim,
            },
          });

          // NIM sudah ada? Lakukan pembaharuan data
          if (existingMahasiswa) {
            existingMahasiswa.nama_mahasiswa = mahasiswa.nama;
            existingMahasiswa.email = mahasiswa.email;
            existingMahasiswa.no_hp = mahasiswa.nohp;
            existingMahasiswa.periode_masuk = mahasiswa.periodemasuk;

            await existingMahasiswa.save();

            responseArray.push({
              status: 200,
              message: `Data Mahasiswa dengan NIM ${mahasiswa.nim} berhasil diperbarui`,
              data: existingMahasiswa,
            });
          } else {
            // NIM belum ada? Tambahkan data baru
            const dataBaruMahasiswa = {
              nim: mahasiswa.nim,
              nama_mahasiswa: mahasiswa.nama,
              email: mahasiswa.email,
              no_hp: mahasiswa.nohp,
              periode_masuk: mahasiswa.periodemasuk,
              created_at: new Date(),
              updated_at: new Date(),
            };

            await Mahasiswa.create(dataBaruMahasiswa);

            responseArray.push({
              status: 201,
              message: `Data Mahasiswa baru dengan NIM ${mahasiswa.nim} berhasil ditambahkan`,
              data: dataBaruMahasiswa,
            });
          }
        }
      }

      return resSend(
        200,
        "Pembaruan data Mahasiswa dari SEVIMA berhasil",
        responseArray,
        res
      );
    } catch (error) {
      next(error);
    }
  }

  // UPDATE Data Dosen
  static async updateDataDosen(req, res, next) {
    try {
      const { limit } = req.body;
      const dosenArray = await SevimaHelper.getDosenIF(limit);

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
      }
      return resSend(
        200,
        "Pembaruan data dosen dari SEVIMA berhasil",
        responseArray,
        res
      );
    } catch (error) {
      next(error);
    }
  }

  // UPDATE Data Matkul
  static async updateDataMatkul(req, res, next) {
    try {
      const { kurikulum, limit } = req.body;
      const matkulArray = await SevimaHelper.getMatkulPrak(kurikulum, limit);

      const isEmptyTableMatkul = (await Matkul.count()) === 0;
      const responseArray = [];

      let dosenPengampu;

      // Data matkul di database kosong?
      if (isEmptyTableMatkul) {
        const dataBaruMatkul = matkulArray.map((item) => {
          // Mengubah format dosen pengampu di SEVIMA API
          if (item.dosenpengampu === " -   ") {
            dosenPengampu = null;
          } else {
            dosenPengampu = item.dosenpengampu.split(" -")[0];
            // "0425098502 -  R. SANDHIKA GALIH AMALGA, ST., MT. "
            // hasil split "0425098502" hanya indeks ke-0 yang diambil
          }

          return {
            kode_mk: item.kodemk,
            nama_mk: item.namamk,
            kurikulum: item.kurikulum,
            sks_mk: item.sksmk,
            dosen_nip: dosenPengampu,
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
      } else {
        // Data matkul sudah ada di database
        for (const matkul of matkulArray) {
          // Mengubah format dosen pengampu di SEVIMA API
          if (matkul.dosenpengampu === " -   ") {
            dosenPengampu = null;
          } else {
            dosenPengampu = matkul.dosenpengampu.split(" -")[0];
            // "0425098502 -  R. SANDHIKA GALIH AMALGA, ST., MT. "
            // hasil split "0425098502" hanya indeks ke-0 yang diambil
          }

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
            existingMatkul.dosen_nip = matkul.dosenPengampu;

            await existingMatkul.save();

            console.log(existingMatkul);
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
              dosen_nip: matkul.dosenPengampu,
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
      }
      return resSend(
        200,
        "Pembaruan data mata kuliah dari SEVIMA berhasil",
        responseArray,
        res
      );
    } catch (error) {
      next(error);
    }
  }

  // UPDATE Data Kelas
  static async updateDataKelas(req, res, next) {
    try {
      const { periode, kurikulum, limit } = req.body;
      const kelasArray = await SevimaHelper.getKelasPrak(
        periode,
        kurikulum,
        limit
      );

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
            periode: item.periodeakademik,
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
            existingKelas.periode = kelas.periodeakademik;

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
              periode: kelas.periodeakademik,
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
      }
      return resSend(
        200,
        "Pembaruan data kelas dari SEVIMA berhasil",
        responseArray,
        res
      );
    } catch (error) {
      next(error);
    }
  }

  // UPDATE Data Jadwal
  static async updateDataJadwal(req, res, next) {
    try {
      const { periode, kurikulum, limit } = req.body;
      const jadwalArray = await SevimaHelper.getJadwalPrak(
        periode,
        kurikulum,
        limit
      );

      const isEmptyTableJadwal = (await JadwalPraktik.count()) === 0;
      const responseArray = [];

      // Mencari data mata kuliah dan diambil kode_mk saja
      const matkulList = await Matkul.findAll({
        attributes: ["kode_mk"],
      });

      // Membuat array baru dari matkulList (kode_mk di tabel matkul)
      const kodeMKList = matkulList.map((matkul) => matkul.kode_mk);

      // Mengambil data yang sesuai dengan kode_mk, kelas_id, dan dosen_nip yang ada di database
      const filteredData = jadwalArray.filter((item) =>
        kodeMKList.find((kodeMK) => kodeMK === item.kodemk)
      );

      // Data jadwal di database kosong?
      if (isEmptyTableJadwal) {
        for (const jadwal of filteredData) {
          // Cari data kelas yang ada di database
          const dataKelas = await Kelas.findOne({
            where: {
              kelas_id: jadwal?.kelasid,
            },
          });

          // Cari data dosen yang ada di database
          const dataDosen = await Dosen.findOne({
            where: { dosen_nip: jadwal.nip },
          });

          // Jika data kelas dan dosen ada pada jadwal tersebut, hubungkan dengan data kelas dan dosen yang ada di database
          // Jika data kelas dan dosen tidak pada jadwal tersebut, tetap masukan jadwal

          if (dataKelas && dataDosen) {
            const dataBaruJadwal = {
              praktik_id: jadwal.jadwalid,
              periode: jadwal.periode,
              pertemuan: jadwal.pertemuan,
              hari: jadwal.hari,
              jam_mulai: jadwal.waktumulai,
              jam_selesai: jadwal.waktuselesai,
              kode_mk: jadwal.kodemk,
              created_at: new Date(),
              updated_at: new Date(),
            };

            await JadwalPraktik.create(dataBaruJadwal);

            responseArray.push({
              status: 201,
              message:
                "Data jadwal dari SEVIMA API berhasil ditambahkan ke database",
              data: dataBaruJadwal,
            });
          }
        }
      } else {
        // Data jadwal sudah ada di database
        for (const jadwal of filteredData) {
          // Cari data jadwal berdasarkan praktik_id
          const existingJadwal = await JadwalPraktik.findOne({
            where: {
              praktik_id: jadwal.jadwalid,
            },
          });
          // Jadwal sudah ada? Lakukan pembaharuan data
          if (existingJadwal) {
            // Cari data kelas yang ada di database
            const dataKelas = await Kelas.findOne({
              where: {
                kelas_id: jadwal?.kelasid,
              },
            });

            // Cari data dosen yang ada di database
            const dataDosen = await Dosen.findOne({
              where: { dosen_nip: jadwal.nip },
            });

            // Jika data kelas dan dosen ada pada jadwal tersebut, hubungkan dengan data kelas dan dosen yang ada di database
            // Jika data kelas dan dosen tidak pada jadwal tersebut, tetap masukan jadwal

            if (dataKelas && dataDosen) {
              existingJadwal.periode = jadwal.periode;
              existingJadwal.pertemuan = jadwal.pertemuan;
              existingJadwal.hari = jadwal.hari;
              existingJadwal.jam_mulai = jadwal.waktumulai;
              existingJadwal.jam_selesai = jadwal.waktuselesai;
              existingJadwal.kode_mk = jadwal.kodemk;
              existingJadwal.kelas_id = jadwal.kelasid;
              existingJadwal.dosen_nip = jadwal.nip;
              existingJadwal.updated_at = new Date();

              await existingJadwal.save();

              responseArray.push({
                status: 200,
                message: `Data jadwal dengan Praktik ID ${jadwal.jadwalid} berhasil diperbarui`,
                data: existingJadwal,
              });
            }
          } else {
            // Jadwal belum ada? Tambahkan data baru

            // Cari data kelas yang ada di database
            const dataKelas = await Kelas.findOne({
              where: {
                kelas_id: jadwal?.kelasid,
              },
            });

            // Cari data dosen yang ada di database
            const dataDosen = await Dosen.findOne({
              where: { dosen_nip: jadwal?.nip },
            });

            // Jika data kelas dan dosen ada pada jadwal tersebut, hubungkan dengan data kelas dan dosen yang ada di database
            // Jika data kelas dan dosen tidak pada jadwal tersebut, tetap masukan jadwal

            if (dataKelas && dataDosen) {
              const dataBaruJadwal = {
                praktik_id: jadwal.jadwalid,
                periode: jadwal.periode,
                pertemuan: jadwal.pertemuan,
                hari: jadwal.hari,
                jam_mulai: jadwal.waktumulai,
                jam_selesai: jadwal.waktuselesai,
                kode_mk: jadwal.kodemk,
                kelas_id: jadwal.kelasid,
                dosen_nip: jadwal.nip,
                created_at: new Date(),
                updated_at: new Date(),
              };

              await JadwalPraktik.create(dataBaruJadwal);
              responseArray.push({
                status: 201,
                message: `Data jadwal praktikum baru dengan ID ${jadwal.jadwalid} berhasil ditambahkan`,
                data: dataBaruJadwal,
              });
            }
          }
        }
      }
      return resSend(
        200,
        "Pembaruan data jadwal dari SEVIMA berhasil",
        responseArray,
        res
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SevimaController;
