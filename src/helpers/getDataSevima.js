const axios = require("axios");
const getToken = require("./getToken");

const dotenv = require("dotenv");
dotenv.config();

const sevimaURL = process.env.BASEURL_SEVIMA;

class SevimaHelper {
  static async getMahasiswaIF(periode, limit) {
    try {
      const token = await getToken();
      const response = await axios.get(sevimaURL + "/biodatamhs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          programstudi: "Teknik Informatika",
          periodemasuk: periode,
          limit: limit.toString(),
        },
      });

      const data = response.data;
      return data;
    } catch (error) {
      throw new Error("Gagal mendapatkan data dari Sevima API");
    }
  }

  static async getDosenIF(limit) {
    try {
      const token = await getToken();
      const response = await axios.get(sevimaURL + "/dosen", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          homebase: "Teknik Informatika",
          limit: limit.toString(),
        },
      });

      const data = response.data;
      return data;
    } catch (error) {
      throw new Error("Gagal mendapatkan data dari Sevima API");
    }
  }

  static async getMatkulPrak(kurikulum, limit) {
    try {
      const token = await getToken();
      const response = await axios.get(sevimaURL + "/matakuliah", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          prodipengampu: "Teknik Informatika",
          kurikulum: kurikulum.toString(),
          limit: limit.toString(),
          jenismk: "Praktikum",
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error("Gagal mendapatkan data dari Sevima API");
    }
  }

  static async getKelasPrak(periode, kurikulum, limit) {
    try {
      const token = await getToken();
      const response = await axios.get(sevimaURL + "/kelaskuliah", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          periodeakademik: periode.toString(),
          programstudi: "Teknik Informatika",
          kurikulum: kurikulum.toString(),
          limit: limit.toString(),
        },
      });

      const data = response.data;
      return data;
    } catch (error) {
      throw new Error("Gagal mendapatkan data dari Sevima API");
    }
  }

  static async getJadwalPrak(periode, kurikulum, limit) {
    try {
      const token = await getToken();
      const response = await axios.get(sevimaURL + "/jadwalperkuliahan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          periode: periode.toString(),
          programstudi: "S1 Teknik Informatika",
          kurikulum: kurikulum.toString(),
          limit: limit.toString(),
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
