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
          limit: "100",
        },
      });

      const data = response.data;
      return data;
    } catch (error) {
      throw new Error("Gagal mendapatkan data dari Sevima API");
    }
  }

  static async getMatkulPrak() {
    try {
      const token = await getToken();
      const response = await axios.get(sevimaURL + "/matakuliah", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          kurikulum: "221",
          prodipengampu: "Teknik Informatika",
          limit: "100",
          jenismk: "Praktikum",
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error("Gagal mendapatkan data dari Sevima API");
    }
  }

  static async getKelasPrak() {
    try {
      const token = await getToken();
      const response = await axios.get(sevimaURL + "/kelaskuliah", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          programstudi: "Teknik Informatika",
          kurikulum: "221",
          limit: "2500",
        },
      });

      const data = response.data;
      return data;
    } catch (error) {
      throw new Error("Gagal mendapatkan data dari Sevima API");
    }
  }

  static async getJadwalPrak() {
    try {
      const token = await getToken();
      const response = await axios.get(sevimaURL + "/jadwalperkuliahan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          programstudi: "S1 Teknik Informatika",
          kurikulum: "221",
          limit: "5000",
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
