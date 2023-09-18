const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");
const uploadFile = require("../middleware/uploadFile");

const PendaftaranController = require("../controllers/pendaftaranController");

router.use(Authenticated);

// --- MAHASISWA ---
// ADD new Pendaftaran By ProgramID
router.post(
  "/:programID",
  Authorization.verifyMahasiswa,
  uploadFile.single("file_syarat"),
  PendaftaranController.addDaftarByProgramId
);

// DELETE Pendaftaran By ProgramID
router.delete(
  "/:programID",
  Authorization.verifyMahasiswa,
  PendaftaranController.deleteFileByProgramId
);

// --- LABORAN ---
// UPDATE status or Validasi By Daftar ID
router.post(
  "/penerimaan/:id",
  Authorization.verifyLaboran,
  PendaftaranController.updateStatusById
);

// GET All Pendaftaran By Program ID
router.get(
  "/:programID",
  Authorization.verifyLaboran,
  PendaftaranController.getAllDaftarByProgramId
);

// GET Pendaftaran By NIM
router.get(
  "/nim/:nim",
  Authorization.verifyLaboran,
  PendaftaranController.getDaftarByNim
);

// GET Pendaftaran By Program ID dan Status
router.get(
  "/penerimaan/:programID",
  Authorization.verifyLaboran,
  PendaftaranController.getDaftarByStatus
);

module.exports = router;
