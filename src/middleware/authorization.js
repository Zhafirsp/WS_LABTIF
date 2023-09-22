const { Asisten } = require("../db/models");
const { resError } = require("../helpers/response");

const verifyLaboran = (req, res, next) => {
  try {
    const userLogin = req.userLogin;

    // User login tidak ada?
    // User login bukan Laboran
    if (!userLogin || userLogin?.role !== "Laboran") {
      return resError(
        403,
        `Akses Dilarang! User adalah ${userLogin?.role}`,
        res
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

const verifyAsisten = async (req, res, next) => {
  try {
    const userLogin = req.userLogin;

    // User login tidak ada?
    // User login bukan Asisten
    if (!userLogin || userLogin.role !== "Asisten") {
      return resError(
        403,
        `Akses Dilarang! User adalah ${userLogin?.role}`,
        res
      );
    }

    // Mencari data asisten untuk memastikan user yang login adalah asisten
    const asisten = await Asisten.findOne({
      where: {
        nim: userLogin.username,
      },
    });

    if (!asisten) {
      return resError(403, "Akses dilarang! User bukan Asisten", res);
    }

    // userLogin adalah asisten? Simpan data asisten di request
    req.userAsisten = asisten;
    next();
  } catch (error) {
    next(error);
  }
};

const verifyMahasiswa = (req, res, next) => {
  try {
    const userLogin = req.userLogin;

    // User login tidak ada?
    // User login bukan Mahasiswa
    if (!userLogin || userLogin.role !== "Mahasiswa") {
      return resError(
        403,
        `Akses Dilarang! User adalah ${userLogin?.role}`,
        res
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyLaboran, verifyAsisten, verifyMahasiswa };
