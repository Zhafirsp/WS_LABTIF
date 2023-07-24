const { Program, Pendaftaran, User, Mahasiswa } = require("../db/models");
const { resError, resSend } = require("../helpers/response");

class PendaftaranController {
  // ADD new Pendaftaran
  static async addPendaftaran(req, res, next) {
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
            nim: userLogin.username,
          },
        });

        // User sudah terdaftar
        if (userExists) {
          return resError(
            404,
            "User sudah terdaftar menjadi calon Asisten",
            res
          );
        } else {
          const user = await User.findOne({
            where: {
              user_id: userLogin.user_id,
            },
            include: {
              model: Mahasiswa,
            },
          });
          // console.log({ iniUSER: user });

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
            file_syarat,
          };
          // console.log({ BERHASIL: newPendaftaran });
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

  // GET Pengumuman
  static async getPengumuman(req, res, next) {
    try {
      const dataPengumuman = await Pendaftaran.findAll({
        where: {
          status: "Diterima",
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data pengumuman ada?
      if (dataPengumuman.length === 0) {
        resError(404, "Data Pengumuman kosong", res);
      } else {
        resSend(
          200,
          "Berhasil mendapatkan data pengumuman",
          dataPengumuman,
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

  // UPDATE Pendaftaran By NIM
  static async updatePendaftaranByNim(req, res, next) {
    try {
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
