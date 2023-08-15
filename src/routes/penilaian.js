const express = require("express");
const router = express.Router();

const PenilaianController = require("../controllers/penilaianController");

router.get("/:kelasID", PenilaianController.getAllPraktikan);
router.get("/:krsID", PenilaianController.getKRSById);

module.exports = router;
