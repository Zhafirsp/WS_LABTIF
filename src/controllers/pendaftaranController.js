const { Program, Pendaftaran, User, Mahasiswa } = require("../db/models");
const { resError, resSend } = require("../helpers/response");

class PendaftaranController {
  // ADD new Pendaftaran
  static async addPendaftaranByProgramId(req, res, next) {
    try {
      const programID = req.params.programID;

      const { file_syarat } = req.body;

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

        const userExists = await Pendaftaran.findOne({
          where: {
            program_id: dataProgram.program_id,
            nim: userLogin.username,
          },
        });

        // User sudah terdaftar pada programID?
        if (userExists) {
          return resError(
            400,
            `User sudah terdaftar menjadi calon Asisten di periode ${dataProgram.periode}`,
            res
          );
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

          // User belum terdaftar pada programID?
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
            no_hp: user.no_hp,
            file_syarat,
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
        resError(404, "Data pendaftaran kosong", res);
      } else {
        resSend(
          200,
          "Berhasil mendapatkan data pendaftaran",
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
        resError(
          404,
          `Data pendaftaran dengan NIM ${mahasiswaNIM} tidak ditemukan`,
          res
        );
      } else {
        resSend(
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
          `Data program dengan periode ${periode} tidak ditemukan`
        );
      } else {
        const dataPengumuman = await Pendaftaran.findAll({
          where: {
            program_id: program.program_id,
            status: "Diterima",
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
            `Berhasil mendapatkan data pengumuman periode ${periode}`,
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
          return resError(400, "User bukan Mahasiswa", res);
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

            return resSend(
              200,
              `NIM ${dataPendaftaran.nim} diterima menjadi Asisten baru`,
              dataPendaftaran,
              res
            );
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

            return resSend(
              200,
              `NIM ${dataPendaftaran.nim} ditolak menjadi Asisten`,
              dataPendaftaran,
              res
            );
          } else if (status === "Menunggu") {
            resSend(200, "Menunggu proses validasi pendaftaran", res);
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE Pendaftaran By NIM
  static async deletePendaftaranByNim(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PendaftaranController;
