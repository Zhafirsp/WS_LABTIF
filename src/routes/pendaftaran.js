const express = require("express");
const router = express.Router();

const PendaftaranController = require("../controllers/pendaftaranController");

router.get("/", PendaftaranController.getAllPendaftaran);
router.get("/:nim", PendaftaranController.getPendaftaranByNim);

module.exports = router;
