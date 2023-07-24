const { Program } = require("../db/models");
const { resError, resSend } = require("../helpers/response");

class ProgramController {
  // ADD new Program
  static async addProgram(req, res, next) {
    try {
      const { periode, judul, deskripsi, batas_waktu } = req.body;

      // Data periode kosong?
      if (!periode) {
        resError(400, "Periode tidak boleh kosong", res);
        // Data judul kosong?
      } else if (!judul) {
        resError(400, "Judul tidak boleh kosong", res);
      } else if (!deskripsi) {
        // Data deskripsi kosong?
        resError(400, "Deskripsi tidak boleh kosong", res);
      } else if (!batas_waktu) {
        // Data batas waktu kosong?
        resError(400, "Batas waktu tidak boleh kosong", res);
      } else {
        const newProgram = await Program.create({
          periode,
          judul,
          deskripsi,
          batas_waktu,
        });
        resSend(200, "Data program baru berhasil ditambahkan", newProgram, res);
      }
    } catch (error) {
      next(error);
    }
  }

  // GET All Program
  static async getAllProgram(req, res, next) {
    try {
      const dataPrograms = await Program.findAll({
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      // Data program kosong?
      if (dataPrograms.length === 0) {
        resError(404, "Data program kosong", res);
      } else {
        resSend(200, "Berhasil mendapatkan data program", dataPrograms, res);
      }
    } catch (error) {
      next(error);
    }
  }

  // GET Program by ID
  static async getProgramById(req, res, next) {
    const programID = req.params.id;

    const dataProgram = await Program.findOne({
      where: {
        program_id: Number(programID),
      },
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });

    // Data program ada?
    if (!dataProgram) {
      resError(404, `Data program dengan id ${programID} tidak ditemukan`, res);
    } else {
      resSend(
        200,
        `Berhasil mendapatkan data program dengan id ${programID}`,
        dataProgram,
        res
      );
    }
  }

  // UPDATE Program by ID
  static async updateProgramById(req, res, next) {
    const programID = req.params.id;

    const { judul, deskripsi, batas_waktu } = req.body;

    const updatedProgram = {
      judul,
      deskripsi,
      batas_waktu,
    };

    const dataProgram = await Program.findOne({
      where: {
        program_id: Number(programID),
      },
    });

    // Data program ada?
    if (!dataProgram) {
      resError(404, `Data program dengan id ${programID} tidak ditemukan`, res);
    } else {
      await Program.update(updatedProgram, {
        where: {
          program_id: Number(programID),
        },
      });
      resSend(
        200,
        `Data program dengan id ${programID} berhasil diubah`,
        updatedProgram,
        res
      );
    }
  }

  // DELETE Program by ID
  static async deleteProgramById(req, res, next) {
    const programID = req.params.id;
    const dataProgram = await Program.findOne({
      where: {
        program_id: Number(programID),
      },
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });

    // Data program ada?
    if (!dataProgram) {
      resError(404, `Data program dengan id ${programID} tidak ditemukan`, res);
    } else {
      await Program.destroy({
        where: {
          program_id: Number(programID),
        },
      });
      resSend(
        200,
        `Data program dengan id ${programID} berhasil dihapus`,
        dataProgram,
        res
      );
    }
  }
}

module.exports = ProgramController;
