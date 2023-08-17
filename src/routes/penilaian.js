const express = require("express");
const router = express.Router();

const PenilaianController = require("../controllers/penilaianController");

router.post("/:krsID", PenilaianController.addNewNilaiByKrsId);
router.get("/praktikan/:kelasID", PenilaianController.getAllPraktikanByKelasId);
router.get("/rekap/:kelasID", PenilaianController.getAllNilaiByKelasId);
router.get("/:krsID", PenilaianController.getNilaiByKrsId);

module.exports = router;
