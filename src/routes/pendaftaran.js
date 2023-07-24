const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const PendaftaranController = require("../controllers/pendaftaranController");

router.post(
  "/:programID",
  Authenticated,
  PendaftaranController.addPendaftaranByProgramId
);
router.post("/penerimaan/:id", PendaftaranController.updateStatusById);
router.get("/", PendaftaranController.getAllPendaftaran);
router.get(
  "/pengumuman/:periode",
  PendaftaranController.getPengumumanByPeriode
);
router.get("/:nim", PendaftaranController.getPendaftaranByNim);

module.exports = router;
