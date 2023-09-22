const axios = require("axios");
const getToken = require("./getToken");

const dotenv = require("dotenv");
dotenv.config();

const sevimaURL = process.env.BASEURL_SEVIMA;

class SevimaHelper {
  static async getMahasiswaIf(periode, limit) {
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
      const responseError = error?.response?.data;
      if (responseError?.error === "not_found") {
        throw new Error(responseError?.error_message);
      } else if (responseError?.error === "invalid_token") {
        throw new Error(responseError?.error_message);
      } else {
        throw new Error(
          responseError?.error_message ||
            "Gagal mendapatkan data Mahasiswa IF dari Sevima API"
        );
      }
    }
  }

  static async getDosenIf(homebase, limit, nip) {
    try {
      const token = await getToken();

      const params = {
        homebase: homebase.toString(),
        limit: limit.toString(),
      };

      // Jika ada data nip di body tambahkan sebagai parameter
      if (nip) {
        params.nip = nip.toString();
      }

      const response = await axios.get(sevimaURL + "/dosen", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: params,
      });

      const data = response.data;
      return data;
    } catch (error) {
      const responseError = error?.response?.data;
      if (responseError?.error === "not_found") {
        throw new Error(responseError?.error_message);
      } else if (responseError?.error === "invalid_token") {
        throw new Error(responseError?.error_message);
      } else {
        throw new Error(
          responseError?.error_message ||
            "Gagal mendapatkan data Dosen IF dari Sevima API"
        );
      }
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
      const responseError = error?.response?.data;
      if (responseError?.error === "not_found") {
        throw new Error(responseError?.error_message);
      } else if (responseError?.error === "invalid_token") {
        throw new Error(responseError?.error_message);
      } else {
        throw new Error(
          responseError?.error_message ||
            "Gagal mendapatkan data mata kuliah praktikum dari Sevima API"
        );
      }
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
      const responseError = error?.response?.data;
      if (responseError?.error === "not_found") {
        throw new Error(responseError?.error_message);
      } else if (responseError?.error === "invalid_token") {
        throw new Error(responseError?.error_message);
      } else {
        throw new Error(
          responseError?.error_message ||
            "Gagal mendapatkan data kelas praktikum dari Sevima API"
        );
      }
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
          sistemkuliah: "Reguler Pagi",
          kurikulum: kurikulum.toString(),
          limit: limit.toString(),
        },
      });

      const data = response.data;
      return data;
    } catch (error) {
      const responseError = error?.response?.data;
      if (responseError?.error === "not_found") {
        throw new Error(responseError?.error_message);
      } else if (responseError?.error === "invalid_token") {
        throw new Error(responseError?.error_message);
      } else {
        throw new Error(
          responseError?.error_message ||
            "Gagal mendapatkan data jadwal praktikum dari Sevima API"
        );
      }
    }
  }

  static async getKrsMahasiswaIf(periode, limit) {
    try {
      const token = await getToken();
      const response = await axios.get(sevimaURL + "/krsmahasiswa", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          idperiode: periode.toString(),
          limit: limit.toString(),
          jenismatakuliah: "Praktikum",
        },
      });

      const data = response.data;
      return data;
    } catch (error) {
      const responseError = error?.response?.data;
      if (responseError?.error === "not_found") {
        throw new Error(responseError?.error_message);
      } else if (responseError?.error === "invalid_token") {
        throw new Error(responseError?.error_message);
      } else {
        throw new Error(
          responseError?.error_message ||
            "Gagal mendapatkan data krs dari Sevima API"
        );
      }
    }
  }
}

module.exports = SevimaHelper;
