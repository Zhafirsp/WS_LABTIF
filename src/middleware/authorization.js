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

const verifyAsisten = (req, res, next) => {
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
