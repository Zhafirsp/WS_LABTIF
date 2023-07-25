const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const PendaftaranController = require("../controllers/pendaftaranController");

// ADD new Pendaftaran
router.post(
  "/:programID",
  Authenticated,
  PendaftaranController.addPendaftaranByProgramId
);

// UPDATE status or Validasi
router.post("/penerimaan/:id", PendaftaranController.updateStatusById);

// GET All Pendaftaran
router.get("/", PendaftaranController.getAllPendaftaran);

// GET Pengumuman By Periode
router.get(
  "/pengumuman/:periode",
  PendaftaranController.getPengumumanByPeriode
);

// GET Pendaftaran By NIM
router.get("/:nim", PendaftaranController.getPendaftaranByNim);

// DELETE Pendaftaran By NIM
router.delete(
  "/:programID",
  Authenticated,
  PendaftaranController.deletePendaftaranByProgramId
);

module.exports = router;
