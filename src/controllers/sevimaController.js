const SevimaHelper = require("../helpers/getDataSevima");
const { Dosen } = require("../db/models");
const { resSend } = require("../helpers/response");

class SevimaController {
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

  static async updateAllDataFromSevima(req, res, next) {
    try {
      const responseArray = [];
      const dataDosen = await SevimaController.updateDataDosen(req, res, next);
      responseArray.push(...dataDosen);
      resSend(
        200,
        "Pembaruan data dari SEVIMA berhasil",
        {
          dosen: responseArray,
          // matkul: resultMatkul,
          // kelas: resultKelas,
        },
        res
      );
      // res.status(200).json("Pembaruan data dari SEVIMA berhasil");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SevimaController;
