const { User, Asisten } = require("../db/models");
const { resError } = require("../helpers/response");

class AsistenController {
  // GET All Asisten
  static async getAllAsisten(req, res, next) {
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
  static async getAsistenById(req, res, next) {
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
}
module.exports = AsistenController;
