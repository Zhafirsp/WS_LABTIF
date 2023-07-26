const { resError } = require("../helpers/response");

module.exports = (req, res, next) => {
  try {
    const userLogin = req.userLogin;

    // User login tidak ada?
    // User login bukan Laboran
    if (!userLogin || userLogin?.role !== "Laboran") {
      return resError(403, "Akses Dilarang!", res);
    }

    return next();
  } catch (error) {
    next(error);
  }
};
