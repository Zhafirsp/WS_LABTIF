const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const PendaftaranController = require("../controllers/pendaftaranController");

router.post("/:programID", Authenticated, PendaftaranController.addPendaftaran);
router.get("/", PendaftaranController.getAllPendaftaran);
router.get("/pengumuman", PendaftaranController.getPengumuman);
router.get("/:nim", PendaftaranController.getPendaftaranByNim);

module.exports = router;
