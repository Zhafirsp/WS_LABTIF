const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");
const PendaftaranController = require("../controllers/pendaftaranController");

router.use(Authenticated);

// --- MAHASISWA ---
// ADD new Pendaftaran By ProgramID
router.post(
  "/:programID",
  Authorization.verifyMahasiswa,
  PendaftaranController.addPendaftaranByProgramId
);

// GET Pengumuman By Periode
router.get(
  "/pengumuman/:periode",
  Authorization.verifyMahasiswa,
  PendaftaranController.getPengumumanByPeriode
);

// DELETE Pendaftaran By ProgramID
router.delete(
  "/:programID",
  Authorization.verifyMahasiswa,
  PendaftaranController.deletePendaftaranByProgramId
);

// --- LABORAN ---
// UPDATE status or Validasi
router.post(
  "/penerimaan/:id",
  Authorization.verifyLaboran,
  PendaftaranController.updateStatusById
);

// GET All Pendaftaran
router.get(
  "/",
  Authorization.verifyLaboran,
  PendaftaranController.getAllPendaftaran
);

// GET Pendaftaran By NIM
router.get(
  "/:nim",
  Authorization.verifyLaboran,
  PendaftaranController.getPendaftaranByNim
);

module.exports = router;
