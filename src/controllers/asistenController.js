const { Program, Pendaftaran, User, Asisten } = require("../db/models");
const generateAslabId = require("../helpers/generateAsistenId");
const { resError, resSend } = require("../helpers/response");

class AsistenController {
  // CREATE New Asisten
  static async addAslabByDaftarID(req, res, next) {
    try {
      const daftarID = req.params.daftarID;

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

      // Data pendaftaran tidak ada?
      if (!dataPendaftaran) {
        return resError(
          404,
          `Data pendaftaran dengan id ${daftarID} tidak ditemukan`,
          res
        );
      } else {
        // Data pendaftaran ada?
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
              no_hp: dataPendaftaran.no_hp,
              periode: periodeProgram,
            };

            await Asisten.create(newAsisten);

            return resSend(
              201,
              `Data asisten baru dengan nim ${dataPendaftaran.nim} berhasil ditambahkan`,
              newAsisten,
              res
            );
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // GET All Asisten
  static async getAllAslab(req, res, next) {
    try {
      const dataAsistens = await Asisten.findAll({
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Kosong?
      if (dataAsistens.length === 0) {
        resError(404, "Data Asisten kosong", res);
      } else {
        resSend(200, "Berhasil mendapatkan data Asisten", dataAsistens, res);
      }
    } catch (error) {
      next(error);
    }
  }

  // GET Asisten By ID
  static async getAslabById(req, res, next) {
    const asistenID = req.params.id;

    const dataAsisten = await Asisten.findOne({
      where: {
        asisten_id: asistenID,
      },
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });

    if (!dataAsisten) {
      resError(404, `Data Asisten dengan id ${asistenID} tidak ditemukan`, res);
    } else {
      resSend(
        200,
        `Berhasil mendapatkan data Asisten dengan id ${asistenID}`,
        dataAsisten,
        res
      );
    }
  }

  // UPDATE Asisten By ID
  static async updateAslabByID(req, res, next) {
    try {
      const asistenID = req.params.id;
      const { nim, email, no_hp, golongan, periode } = req.body;

      const dataAsisten = await Asisten.findOne({
        where: {
          asisten_id: asistenID,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Asisten ada?
      if (!dataAsisten) {
        return resError(
          404,
          `Data Asisten dengan id ${asistenID} tidak ditemukan`,
          res
        );
      } else {
        // Perubahan golongan
        await Asisten.update(
          { golongan: golongan },
          {
            where: {
              asisten_id: asistenID,
            },
          }
        );
      }
    } catch (error) {
      next(error);
    }
  }
  // DELETE Asisten By ID
  static async deleteAslabByID(req, res, next) {
    try {
      const asistenID = req.params.id;

      const dataAsisten = await Asisten.findOne({
        where: {
          asisten_id: asistenID,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data Asisten ada?
      if (!dataAsisten) {
        return resError(
          404,
          `Data Asisten dengan id ${asistenID} tidak ditemukan`,
          res
        );
      } else {
        const dataUser = await User.findOne({
          where: {
            username: dataAsisten.nim,
          },
        });

        // Mengubah role menjadi Mahasiswa
        dataUser.role = "Mahasiswa";
        await dataUser.save();

        await Asisten.destroy({
          where: {
            asisten_id: asistenID,
          },
        });

        return resSend(
          200,
          `Data Asisten dengan id ${asistenID} berhasil dihapus`,
          dataAsisten,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = AsistenController;
