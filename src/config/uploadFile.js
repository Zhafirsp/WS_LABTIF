const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const nim = req.userLogin.username;
    const timestamp = Date.now();
    const uniqueSuffix = nim + "_" + timestamp;
    // Menambahkan ekstensi .zip pada nama file
    cb(
      null,
      file.fieldname + "_" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" || // Dokumen Word (doc)
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // Dokumen Word (docx)
    file.mimetype === "text/plain" || // Teks
    file.mimetype === "application/zip" // ZIP
  ) {
    cb(null, true);
  } else {
    cb(new Error("Jenis file yang diunggah tidak diizinkan."), false);
  }
};

const uploadFile = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
});

module.exports = uploadFile;
