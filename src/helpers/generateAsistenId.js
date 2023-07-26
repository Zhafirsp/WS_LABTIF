const { Asisten } = require("../db/models");

async function generateAsistenId(periode) {
  const lastAsisten = await Asisten.findOne({
    where: {
      periode,
    },
    // Diurutkan besar ke kecil
    // akan mengambil asisten_id paling besar
    order: [["asisten_id", "DESC"]],
  });

  //  Data asisten pada periode saat ini kosong?
  let count = 1;

  //  Data asisten pada periode saat ini ada?
  if (lastAsisten) {
    const lastAsistenId = lastAsisten.asisten_id;

    // Mengambil 3 karakter terakhir dari asisten_id dan mengubahnya menjadi integer
    const lastIdNumber = parseInt(lastAsistenId.slice(-3));

    // tambah 1
    count = lastIdNumber + 1;
  }

  // Mengambil 2 karakter terakhir dari periode
  const periodeSuffix = periode.slice(-2);

  // Pembuatan custom asisten_id
  const asisten_id = `AS${periodeSuffix}${count.toString().padStart(3, "0")}`;

  return asisten_id;
}

module.exports = generateAsistenId;
