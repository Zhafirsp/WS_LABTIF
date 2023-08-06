const { Pengumuman } = require("../db/models");
const { resError, resSend } = require("../helpers/response");

class PengumumanController {
  // ADD New Pengumuman
  static async addPengumuman(req, res, next) {
    try {
      const { judul, dokumen, link, is_publish } = req.body;

      // Data judul kosong?
      if (!judul) {
        return resError(400, "Judul tidak boleh kosong", res);
      } else {
        // Mencegah duplikasi judul
        const judulExists = await Pengumuman.findOne({
          where: {
            judul,
          },
        });

        // Judul sudah ada?
        if (judulExists) {
          return resError(404, "Judul sudah ada", res);
        }

        const newPengumuman = await Pengumuman.create({
          judul,
          dokumen,
          link,
          tanggal_publish: new Date(),
          is_publish,
        });

        return resSend(
          200,
          "Berhasil menambahkan data pengumuman baru",
          newPengumuman,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // GET All Pengumuman
  static async getAllPengumuman(req, res, next) {
    try {
      const dataPengumumans = await Pengumuman.findAll({
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data pengumuman kosong?
      if (dataPengumumans.length === 0) {
        return resError(404, "Data pengumuman kosong", res);
      } else {
        return resSend(
          200,
          "Berhasil mendapatkan seluruh data pengumuman",
          dataPengumumans,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // GET All Pengumuman By Publish True
  static async getPengumumanActive(req, res, next) {
    try {
      const dataPengumuman = await Pengumuman.findAll({
        where: {
          is_publish: true,
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data pengumuman active kosong?
      if (dataPengumuman.length === 0) {
        return resError(
          404,
          "Data pengumuman dengan status publish aktif tidak ditemukan",
          res
        );
      } else {
        return resSend(
          200,
          "Berhasil mendapatkan seluruh data pengumuman dengan status publish aktif",
          dataPengumuman,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // GET Pengumuman By Id
  static async getPengumumanById(req, res, next) {
    try {
      const infoID = req.params.id;

      const dataPengumuman = await Pengumuman.findOne({
        where: {
          info_id: Number(infoID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data pengumuman tidak ada?
      if (!dataPengumuman) {
        return resError(
          404,
          `Data pengumuman dengan id ${infoID} tidak ditemukan`,
          res
        );
      } else {
        return resSend(
          200,
          `Berhasil mendapatkan data pengumuman dengan id ${infoID}`,
          dataPengumuman,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // UPDATE Pengumuman By Id
  static async updatePengumumanById(req, res, next) {
    try {
      const infoID = req.params.id;

      const { judul, dokumen, link, is_publish } = req.body;

      const dataPengumuman = await Pengumuman.findOne({
        where: {
          info_id: Number(infoID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data pengumuman tidak ada?
      if (!dataPengumuman) {
        return resError(
          404,
          `Data pengumuman dengan ${infoID} tidak ditemukan`,
          res
        );
      } else {
        // Ada data judul yang akan di update?
        if (judul) {
          // Mencegah duplikasi judul
          const judulExists = await Pengumuman.findOne({
            where: {
              judul,
            },
          });
          // Judul sudah ada?
          if (judulExists) {
            return resError(404, "Judul sudah ada", res);
          }
        }

        const updatedPengumuman = {
          judul,
          dokumen,
          link,
          is_publish,
        };

        await Pengumuman.update(updatedPengumuman, {
          where: {
            info_id: Number(infoID),
          },
        });
        return resSend(
          200,
          `Berhasil mengubah data program dengan id ${infoID}`,
          updatedPengumuman,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE Pengumuman By Id
  static async deletePengumumanById(req, res, next) {
    try {
      const infoID = req.params.id;

      const dataPengumuman = await Pengumuman.findOne({
        where: {
          info_id: Number(infoID),
        },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data pengumuman tidak ada?
      if (!dataPengumuman) {
        return resError(
          404,
          `Data pengumuman dengan ${infoID} tidak ditemukan`,
          res
        );
      } else {
        // Non-active menampilkan pengumuman
        dataPengumuman.is_publish = false;
        await dataPengumuman.save();

        return resSend(
          200,
          `Berhasil menghapus data pengumuman dengan id ${infoID}`,
          dataPengumuman,
          res
        );
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PengumumanController;
