module.exports = (error, req, res, next) => {
  if (error.code && error.message) {
    return res.status(error.code).json({
      error: error.message,
    });
    // Menangani kesalahan validasi Sequelize
  } else if (error.name === "SequelizeValidationError") {
    const errors = error.errors.map((error) => error.message);
    res.status(400).json({ errors });
  } else {
    console.log(error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};
