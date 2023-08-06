const {
  Program,
  Pendaftaran,
  User,
  Mahasiswa,
  Asisten,
} = require("../db/models");
const generateAslabId = require("../helpers/generateAsistenId");
const { resError, resSend } = require("../helpers/response");

class PendaftaranController {
  // ADD new Pendaftaran
  static async addPendaftaranByProgramId(req, res, next) {
    try {
      const programID = req.params.programID;

      const { file_syarat, bidang_praktikum } = req.body;

      const dataProgram = await Program.findOne({
        where: {
          program_id: Number(programID),
        },
      });

      // Data program tidak ada?
      if (!dataProgram) {
        return resError(404, "Data program tidak ditemukan", res);
      } else {
        const userLogin = req.userLogin;

        // Mencari data user login di data pendaftaran berdasarkan programID
        const userExists = await Pendaftaran.findOne({
          where: {
            program_id: dataProgram.program_id,
            nim: userLogin.username,
          },
          attributes: {
            exclude: ["created_at", "updated_at"],
          },
        });

        // User sudah terdaftar menjadi calon asisten pada programID?
        if (userExists) {
          // File syarat kosong?
          if (userExists.file_syarat === null) {
            userExists.file_syarat = file_syarat;
            await userExists.save();

            return resSend(
              200,
              `Berhasil mengubah data file_syarat NIM ${userLogin.username} pada periode ${dataProgram.periode}`,
              userExists,
              res
            );
          } else {
            return resError(
              400,
              "Perubahan file_syarat tidak diizinkan, hapus terlebih dahulu file sebelumnya",
              res
            );
          }
        } else {
          // Memastikan data user sudah menjadi asisten di program lain
          const userAsAsisten = await Pendaftaran.findOne({
            where: {
              nim: userLogin.username,
              status: "Diterima",
            },
          });

          // User adalah asisten?
          if (userAsAsisten) {
            return resError(
              400,
              `User dengan NIM ${userLogin.username} sudah menjadi Asisten di periode lain`,
              res
            );
          }

          // User belum terdaftar menjadi calon asisten pada programID?
          const user = await User.findOne({
            where: {
              user_id: userLogin.user_id,
            },
            include: {
              model: Mahasiswa,
            },
          });

          if (!user) {
            return resError(
              404,
              `Data User ${user.user_id} tidak ditemukan`,
              res
            );
          }

          const newPendaftaran = {
            program_id: dataProgram.program_id,
            tanggal_daftar: new Date(),
            nim: user.Mahasiswa.nim,
            nama_mahasiswa: user.Mahasiswa.nama_mahasiswa,
            email: user.email,
            email_kampus: user.Mahasiswa.email_kampus,
            no_hp: user.no_hp,
            file_syarat,
            bidang_praktikum,
          };

          await Pendaftaran.create(newPendaftaran);

          return resSend(
            201,
            `Berhasil menambahkan data pendaftaran baru NIM ${userLogin.username}`,
            newPendaftaran,
            res
          );
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // GET All Pendaftaran
  static async getAllPendaftaran(req, res, next) {
    try {
      const dataPendaftarans = await Pendaftaran.findAll({
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data pendaftaran kosong?
      if (dataPendaftarans.length === 0) {
        return resError(404, "Data pendaftaran kosong", res);
      } else {
        return resSend(
          200,
          "Berhasil mendapatkan seluruh data pendaftaran",
          dataPendaftarans,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // GET Pendaftaran By NIM
  static async getPendaftaranByNim(req, res, next) {
    try {
      const mahasiswaNIM = req.params.nim;

      const dataPendaftaran = await Pendaftaran.findOne({
        where: {
          nim: mahasiswaNIM,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data pendaftaran ada?
      if (!dataPendaftaran) {
        return resError(
          404,
          `Data pendaftaran dengan NIM ${mahasiswaNIM} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan data pendaftaran dengan NIM ${mahasiswaNIM}`,
          dataPendaftaran,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // GET Pengumuman By Periode
  static async getPengumumanByPeriode(req, res, next) {
    try {
      const periode = req.params.periode;

      const program = await Program.findOne({
        where: {
          periode,
        },
      });

      if (!program) {
        return resError(
          404,
          `Data program dengan periode ${periode} tidak ditemukan`,
          res
        );
      } else {
        const dataPengumuman = await Pendaftaran.findAll({
          where: {
            program_id: program.program_id,
          },
          attributes: {
            exclude: ["created_at", "updated_at"],
          },
        });

        // Data pengumuman ada?
        if (dataPengumuman.length === 0) {
          return resError(404, "Data Pengumuman kosong", res);
        } else {
          return resSend(
            200,
            `Berhasil mendapatkan seluruh data pengumuman dengan periode ${periode}`,
            dataPengumuman,
            res
          );
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // UPDATE status or Validasi
  static async updateStatusById(req, res, next) {
    try {
      const daftarID = req.params.id;

      const { status } = req.body;

      const dataPendaftaran = await Pendaftaran.findOne({
        where: {
          daftar_id: Number(daftarID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
        include: {
          model: Program,
        },
      });

      // Data pendaftaran ada?
      if (!dataPendaftaran) {
        return resError(
          404,
          `Data pendaftaran dengan id ${daftarID} tidak ditemukan`,
          res
        );
      } else {
        // Memastikan data user adalah Mahasiswa
        const userAsMahasiswa = await User.findOne({
          where: {
            username: dataPendaftaran.nim,
            role: "Mahasiswa",
          },
        });

        // User bukan Mahasiswa?
        if (!userAsMahasiswa) {
          return resError(400, "Data user tidak memiliki role Mahasiswa", res);
        } else {
          // Mahasiswa diterima menjadi Asisten?
          if (status === "Diterima") {
            // Perubahan status
            await Pendaftaran.update(
              { status: "Diterima" },
              {
                where: {
                  daftar_id: Number(daftarID),
                  // Memastikan nim pada data pendaftaran sesuai dengan username di data User
                  nim: userAsMahasiswa.username,
                },
              }
            );

            // Perubahan role "Mahasiswa" menjadi role "Asisten"
            await User.update(
              {
                role: "Asisten",
              },
              { where: { username: dataPendaftaran.nim } }
            );

            // --- Data penambahan asisten ---
            // Data pendaftaran ada pada tabel Asisten?
            const dataAsisten = await Asisten.findOne({
              where: {
                nim: dataPendaftaran.nim,
              },
            });

            // Mahasiswa sudah ada di data Asisten
            if (dataAsisten) {
              return resError(
                400,
                `Asisten dengan nim ${dataPendaftaran.nim} sudah terdaftar`,
                res
              );
            } else {
              // Memastikan data mahasiswa sudah menjadi asisten
              const userAsAsisten = await User.findOne({
                where: {
                  username: dataPendaftaran.nim,
                  role: "Asisten",
                },
              });

              // Mahasiswa bukan asisten baru
              if (!userAsAsisten) {
                return resError(
                  400,
                  `Data pendaftaran dengan NIM ${dataPendaftaran.nim} bukan Asisten`,
                  res
                );
              } else {
                // Mahasiswa sudah menjadi asisten baru
                // Ambil periode pada data program yang ada di data pendaftaran
                const periodeProgram = dataPendaftaran.Program.periode;

                // Buat costum asisten_id
                const asisten_id = await generateAslabId(periodeProgram);
                // Buat data asisten baru
                const newAsisten = {
                  asisten_id: asisten_id,
                  nim: dataPendaftaran.nim,
                  nama_asisten: dataPendaftaran.nama_mahasiswa,
                  email: dataPendaftaran.email,
                  email_kampus: dataPendaftaran.email_kampus,
                  no_hp: dataPendaftaran.no_hp,
                  bidang_praktikum: dataPendaftaran.bidang_praktikum,
                  periode: periodeProgram,
                };

                await Asisten.create(newAsisten);

                return resSend(
                  201,
                  `Berhasil menambahkan data asisten baru dengan nim ${dataPendaftaran.nim}`,
                  newAsisten,
                  res
                );
              }
            }
          } else if (status === "Ditolak") {
            // Mahasiswa ditolak menjadi Asisten?
            // Perubahan status
            await Pendaftaran.update(
              { status: "Ditolak" },
              {
                where: {
                  daftar_id: Number(daftarID),
                  // Memastikan nim pada data pendaftaran sesuai dengan username di data User
                  nim: userAsMahasiswa.username,
                },
              }
            );

            const validasi = {
              daftar_id: daftarID,
              nim: dataPendaftaran.nim,
              nama_mahasiswa: dataPendaftaran.nama_mahasiswa,
              status,
            };
            return resSend(
              200,
              `Berhasil melakukan validasi data pendaftaran dengan NIM ${dataPendaftaran.nim}`,
              validasi,
              res
            );
          } else if (status === "Menunggu") {
            return resSend(
              200,
              "Menunggu proses validasi pendaftaran",
              null,
              res
            );
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE Pendaftaran By NIM
  static async deletePendaftaranByProgramId(req, res, next) {
    try {
      const programID = req.params.programID;

      const dataProgram = await Program.findOne({
        where: {
          program_id: Number(programID),
        },
      });

      // Data program tidak ada?
      if (!dataProgram) {
        return resError(404, "Data program tidak ditemukan", res);
      } else {
        const userLogin = req.userLogin;

        // Mencari data user login di data pendaftaran berdasarkan programID
        const dataPendaftaran = await Pendaftaran.findOne({
          where: {
            program_id: dataProgram.program_id,
            nim: userLogin.username,
          },
          attributes: {
            exclude: ["created_at", "updated_at"],
          },
        });

        // User tidak ada pada data pendaftaran?
        if (!dataPendaftaran) {
          return resError(
            404,
            `Data pendaftaran user dengan username ${userLogin?.username} tidak ditemukan`,
            res
          );
        } else {
          // Memastikan agar data pendaftaran milik asisten tidak boleh dihapus
          const userAsAsisten = await Pendaftaran.findOne({
            where: {
              nim: userLogin.username,
              status: "Diterima",
            },
          });

          // User adalah asisten?
          if (userAsAsisten) {
            return resError(
              400,
              "Dilarang menghapus data pendaftaran milik Asisten",
              res
            );
          } else {
            // User memiliki data file syarat yang telah diupload sebelumnya
            if (dataPendaftaran.file_syarat) {
              // Hapus file_syarat pada data pendaftaran
              dataPendaftaran.file_syarat = null;
              await dataPendaftaran.save();

              return resSend(
                200,
                `Berhasil menghapus file syarat pada data pendaftaran username ${userLogin?.username} dengan program id ${programID}`,
                dataPendaftaran,
                res
              );
              // User tidak memiliki data file syarat yang telah diupload sebelumnya
            } else {
              return resError(
                404,
                `Data file syarat pada data pendaftaran username ${userLogin.username} dengan program id ${programID} tidak ditemukan`,
                res
              );
            }
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PendaftaranController;
