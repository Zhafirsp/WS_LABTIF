const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(
      null,
      file.fieldname + "_" + timestamp + "_" + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Jenis file yang diunggah tidak diizinkan."), false);
  }
};

const uploadImage = multer({ storage: fileStorage, fileFilter: fileFilter });

module.exports = uploadImage;
