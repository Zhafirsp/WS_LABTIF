const axios = require("axios");
const getToken = require("./getToken");

const dotenv = require("dotenv");
dotenv.config();

const sevimaURL = process.env.BASEURL_SEVIMA;

class SevimaHelper {
  static async getDosenIF() {
    try {
      const token = await getToken();
      const response = await axios.get(sevimaURL + "/dosen", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          homebase: "Teknik Informatika",
          limit: "4",
        },
      });

      const data = response.data;
      return data;
    } catch (error) {
      throw new Error("Gagal mendapatkan data dari Sevima API");
    }
  }
}

module.exports = SevimaHelper;
