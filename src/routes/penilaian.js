const express = require("express");
const router = express.Router();

const PenilaianController = require("../controllers/penilaianController");

router.get("/:kelasID", PenilaianController.getAllPraktikan);

module.exports = router;
