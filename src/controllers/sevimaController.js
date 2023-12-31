const SevimaHelper = require("../helpers/getDataSevima");
const {
  Mahasiswa,
  Dosen,
  Matkul,
  Kelas,
  JadwalPraktik,
  JadwalPiket,
  Krs,
} = require("../db/models");
const { resSend, resError } = require("../helpers/response");

class SevimaController {
  // UPDATE Data Mahasiswa
  static async updateDataMahasiswa(req, res, next) {
    try {
      const { periode, limit } = req.body;

      const mahasiswaArray = await SevimaHelper.getMahasiswaIf(periode, limit);
      const isEmptyTableMahasiswa = (await Mahasiswa.count()) === 0;

      const responseArray = [];

      // Data Mahasiswa di database kosong?
      if (isEmptyTableMahasiswa) {
        const dataBaruMahasiswa = mahasiswaArray.map((item) => {
          return {
            nim: item.nim,
            nama_mahasiswa: item.nama,
            email: item.email,
            email_kampus: item.emailkampus,
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
            "Berhasil menambahkan data Mahasiswa dari SEVIMA API ke database",
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
            existingMahasiswa.email_kampus = mahasiswa.emailkampus;
            existingMahasiswa.no_hp = mahasiswa.nohp;
            existingMahasiswa.periode_masuk = mahasiswa.periodemasuk;

            await existingMahasiswa.save();

            responseArray.push({
              status: 200,
              message: `Berhasil memperbarui data Mahasiswa dengan NIM ${mahasiswa.nim}`,
              data: existingMahasiswa,
            });
          } else {
            // NIM belum ada? Tambahkan data baru
            const dataBaruMahasiswa = {
              nim: mahasiswa.nim,
              nama_mahasiswa: mahasiswa.nama,
              email: mahasiswa.email,
              email_kampus: mahasiswa.emailkampus,
              no_hp: mahasiswa.nohp,
              periode_masuk: mahasiswa.periodemasuk,
              created_at: new Date(),
              updated_at: new Date(),
            };

            await Mahasiswa.create(dataBaruMahasiswa);

            responseArray.push({
              status: 201,
              message: `Berhasil menambahkan data Mahasiswa baru dengan NIM ${mahasiswa.nim}`,
              data: dataBaruMahasiswa,
            });
          }
        }
      }

      return resSend(
        200,
        "Berhasil memperbarui data Mahasiswa dari SEVIMA",
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
      const { homebase, limit, nip } = req.body;
      const dosenArray = await SevimaHelper.getDosenIf(homebase, limit, nip);

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
            "Berhasil menambahkan data Dosen dari SEVIMA API ke database",
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
              message: `Berhasil memperbarui Data dosen dengan NIP ${dosen.nip}`,
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
              message: `Berhasil menambahkan data dosen baru dengan NIP ${dosen.nip}`,
              data: dataBaruDosen,
            });
          }
        }
      }
      return resSend(
        200,
        "Berhasil memperbarui data dosen dari SEVIMA",
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
            "Berhasil menambahkan data mata kuliah dari SEVIMA API ke database",
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
              message: `Berhasil memperbarui data mata kuliah dengan kode mk ${matkul.kodemk}`,
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
              message: `Berhasil menambahkan data mata kuliah baru dengan kode mk ${matkul.kodemk}`,
              data: dataBaruMatkul,
            });
          }
        }
      }
      return resSend(
        200,
        "Berhasil memperbarui data mata kuliah dari SEVIMA",
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
            "Berhasil menambahkan data kelas dari SEVIMA API ke database",
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
              message: `Berhasil memperbarui data kelas dengan Kelas ID ${kelas.kelasid}`,
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
              message: `Berhasil menambahkan data kelas baru dengan Kelas ID ${kelas.kelasid}`,
              data: dataBaruKelas,
            });
          }
        }
      }
      return resSend(
        200,
        "Berhasil memperbarui data kelas dari SEVIMA",
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
        let dataJadwal = [];

        for (const jadwal of filteredData) {
          // Cari data kelas yang ada di database
          const dataKelas = await Kelas.findOne({
            where: {
              kelas_id: jadwal.kelasid,
            },
          });

          const dataBaruJadwal = {
            praktik_id: jadwal.jadwalid,
            periode: jadwal.periode,
            pertemuan: jadwal.pertemuan,
            hari: jadwal.hari,
            jam_mulai: jadwal.waktumulai,
            jam_selesai: jadwal.waktuselesai,
            kode_mk: jadwal.kodemk,
            kelas_id: jadwal.kelasid,
            nama_kelas: dataKelas.nama_kelas,
            dosen_nip: jadwal.nip,
            created_at: new Date(),
            updated_at: new Date(),
          };

          await JadwalPraktik.create(dataBaruJadwal);

          dataJadwal.push(dataBaruJadwal);
        }

        responseArray.push({
          status: 201,
          message:
            "Berhasil menambahkan data jadwal praktikum baru dari SEVIMA API ke database",
          data: dataJadwal,
        });
      } else {
        // Data jadwal sudah ada di database
        for (const jadwal of filteredData) {
          // Cari data jadwal berdasarkan praktik_id
          const existingJadwal = await JadwalPraktik.findOne({
            where: {
              praktik_id: jadwal.jadwalid,
            },
            attributes: {
              exclude: ["created_at", "updated_at"],
            },
          });
          // Jadwal sudah ada? Lakukan pembaharuan data
          if (existingJadwal) {
            // Cari data kelas yang ada di database
            const dataKelas = await Kelas.findOne({
              where: {
                kelas_id: jadwal.kelasid,
              },
            });

            existingJadwal.periode = jadwal.periode;
            existingJadwal.pertemuan = jadwal.pertemuan;
            existingJadwal.hari = jadwal.hari;
            existingJadwal.jam_mulai = jadwal.waktumulai;
            existingJadwal.jam_selesai = jadwal.waktuselesai;
            existingJadwal.kode_mk = jadwal.kodemk;
            existingJadwal.kelas_id = jadwal.kelasid;
            existingJadwal.nama_kelas = dataKelas.nama_kelas;
            existingJadwal.dosen_nip = jadwal.nip;
            existingJadwal.updated_at = new Date();

            await existingJadwal.save();

            responseArray.push({
              status: 200,
              message: `Berhasil memperbarui data jadwal praktikum dengan Praktik ID ${jadwal.jadwalid}`,
              data: existingJadwal,
            });
          } else {
            // Data jadwal berdasarkan kelas_id belum ada? Tambahkan data baru
            // Cari data kelas yang ada di database
            const dataKelas = await Kelas.findOne({
              where: {
                kelas_id: jadwal.kelasid,
              },
            });

            const dataBaruJadwal = {
              praktik_id: jadwal.jadwalid,
              periode: jadwal.periode,
              pertemuan: jadwal.pertemuan,
              hari: jadwal.hari,
              jam_mulai: jadwal.waktumulai,
              jam_selesai: jadwal.waktuselesai,
              kode_mk: jadwal.kodemk,
              kelas_id: jadwal.kelasid,
              nama_kelas: dataKelas.nama_kelas,
              dosen_nip: jadwal.nip,
              created_at: new Date(),
              updated_at: new Date(),
            };

            await JadwalPraktik.create(dataBaruJadwal);
            responseArray.push({
              status: 201,
              message: `Berhasil menambahkan data jadwal praktikum baru dengan ID ${jadwal.jadwalid}`,
              data: dataBaruJadwal,
            });
          }
        }
      }
      return resSend(
        200,
        "Berhasil memperbarui data jadwal praktikum dari SEVIMA",
        responseArray,
        res
      );
    } catch (error) {
      next(error);
    }
  }

  // UPDATE Data KRS
  static async updateDataKrs(req, res, next) {
    try {
      const { periode, limit } = req.body;

      const krsArray = await SevimaHelper.getKrsMahasiswaIf(periode, limit);

      const isEmptyTableKRS = (await Krs.count()) === 0;
      const responseArray = [];

      // Objek untuk sementara menyimpan data unik
      const uniqueDataKRS = {};

      //Mencari data Mahasiswa dan diambil nim
      const mhsList = await Mahasiswa.findAll({
        attributes: ["nim"],
      });

      // Membuat array baru dari mhsList (nim di tabel Mahasiswa)
      const nimList = mhsList.map((mhs) => mhs.nim);

      // Mengambil data yang sesuai dengan nim yang ada di tabel Mahasiswa
      // serta status krsdiajukan dan krsdisetujui bernilai "Ya"
      const filteredData = krsArray.filter((item) =>
        nimList.find(
          (nim) =>
            nim === item.nim &&
            item.krsdiajukan === "Ya" &&
            item.krsdisetujui === "Ya"
        )
      );

      // Data krs di database kosong?
      if (isEmptyTableKRS) {
        let dataKRS = [];
        for (const krs of filteredData) {
          const krsDataKey = `${krs.idperiode}-${krs.idmk}-${krs.namakelas}-${krs.nim}`;

          if (!uniqueDataKRS[krsDataKey]) {
            // Apakah data nama kelas dan kode mk di tabel krs cocok dengan data di tabel kelas
            const matchingKelas = await Kelas.findOne({
              where: {
                kode_mk: krs.idmk,
                periode: krs.idperiode,
                nama_kelas: krs.namakelas,
              },
            });

            // Data cocok?
            if (matchingKelas) {
              // Jika ditemukan kelas yang cocok, ambil kelas_id
              const kelasID = matchingKelas.kelas_id;

              const dataBaruKRS = {
                periode_krs: krs.idperiode,
                kode_mk: krs.idmk,
                kelas_id: kelasID,
                nama_kelas: krs.namakelas,
                nim: krs.nim,
                created_at: new Date(),
                updated_at: new Date(),
              };
              await Krs.create(dataBaruKRS);

              dataKRS.push(dataBaruKRS);

              uniqueDataKRS[krsDataKey] = true;
            }
          }
        }
        responseArray.push({
          status: 201,
          message: `Berhasil menambahkan data KRS baru dengan periode ${periode} dari SEVIMA API ke database`,
          data: dataKRS,
        });
      } else {
        // Data krs sudah ada di database
        for (const krs of filteredData) {
          // Cari data krs berdasarkan periode, kode_mk, nama_kelas, nim
          const existingKrs = await Krs.findOne({
            where: {
              periode_krs: krs.idperiode,
              kode_mk: krs.idmk,
              nama_kelas: krs.namakelas,
              nim: krs.nim,
            },
            attributes: {
              exclude: ["created_at", "updated_at"],
            },
          });

          // Apakah data nama kelas dan kode mk di tabel krs cocok dengan data di tabel kelas
          const matchingKelas = await Kelas.findOne({
            where: {
              kode_mk: krs.idmk,
              periode: krs.idperiode,
              nama_kelas: krs.namakelas,
            },
          });

          // Data KRS sudah ada, perbaharui jika ada perubahan di SEVIMA API
          if (existingKrs) {
            const { periode_krs, kode_mk, nama_kelas, nim } = existingKrs;
            // Data cocok?
            if (matchingKelas) {
              // Jika ditemukan kelas yang cocok, ambil kelas_id
              const kelasID = matchingKelas.kelas_id;

              const krsDataKey = `${periode_krs}-${kode_mk}-${nama_kelas}-${nim}`;

              if (!uniqueDataKRS[krsDataKey]) {
                existingKrs.periode_krs = krs.idperiode;
                existingKrs.kode_mk = krs.idmk;
                existingKrs.kelas_id = kelasID;
                existingKrs.nama_kelas = krs.namakelas;
                existingKrs.nim = krs.nim;

                await existingKrs.save();

                responseArray.push({
                  status: 200,
                  message: `Berhasil memperbarui data krs milik NIM ${krs.nim}`,
                  data: existingKrs,
                });
                uniqueDataKRS[krsDataKey] = true;
              }
            }
          } else {
            // Data KRS belum ada, tambahkan data baru
            const krsDataKey = `${krs.idperiode}-${krs.idmk}-${krs.namakelas}-${krs.nim}`;

            if (!uniqueDataKRS[krsDataKey]) {
              if (matchingKelas) {
                // Jika ditemukan kelas yang cocok, ambil kelas_id
                const kelasID = matchingKelas.kelas_id;

                const newKRS = {
                  periode_krs: krs.idperiode,
                  kode_mk: krs.idmk,
                  kelas_id: kelasID,
                  nama_kelas: krs.namakelas,
                  nim: krs.nim,
                  created_at: new Date(),
                  updated_at: new Date(),
                };

                await Krs.create(newKRS);

                responseArray.push({
                  status: 201,
                  message: `Berhasil menambahkan data krs baru milik NIM ${krs.nim}`,
                  data: newKRS,
                });

                uniqueDataKRS[krsDataKey] = true;
              }
            }
          }
        }
      }

      return resSend(
        200,
        "Berhasil memperbarui data krs dari SEVIMA",
        responseArray,
        res
      );
    } catch (error) {
      next(error);
    }
  }

  // GET All Mahasiswa By Periode
  static async getAllMahasiswaByPeriode(req, res, next) {
    try {
      const { periode } = req.body;

      const dataMhs = await Mahasiswa.findAll({
        where: {
          periode_masuk: periode,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Mahasiswa kosong?
      if (dataMhs.length === 0) {
        return resError(
          404,
          `Data Mahasiswa dengan periode ${periode} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan seluruh data Mahasiswa pada periode ${periode}`,
          dataMhs,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // GET All Praktikan Kelas ID
  static async getAllPraktikanByKelasId(req, res, next) {
    try {
      const { kelas_id } = req.body;

      const dataKRS = await Krs.findAll({
        where: {
          kelas_id,
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
          `Data Praktikan dengan kelas id ${kelas_id} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan seluruh data Praktikan pada kelas id ${kelas_id}`,
          dataKRS,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // GET All Jadwal Praktikum By Periode
  static async getAllJadwalByPeriode(req, res, next) {
    try {
      const { periode } = req.body;

      const dataPraktiks = await JadwalPraktik.findAll({
        where: {
          periode,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
        include: [
          {
            model: Matkul,
            attributes: ["nama_mk", "sks_mk", "kode_mk"],
          },
          {
            model: Kelas,
            attributes: ["nama_kelas", "nama_ruang"],
          },
          {
            model: Dosen,
            attributes: ["nama_dosen", "dosen_nip"],
          },
          {
            model: JadwalPiket,
            attributes: ["asisten_id", "nama_asisten"],
          },
        ],
      });

      // Data Praktik kosong?
      if (dataPraktiks.length === 0) {
        return resError(
          404,
          `Data jadwal praktikum dengan periode ${periode} tidak ditemukan`,
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
}

module.exports = SevimaController;
