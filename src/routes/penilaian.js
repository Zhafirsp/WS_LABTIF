const express = require("express");
const router = express.Router();

const PenilaianController = require("../controllers/penilaianController");

router.post("/:krsID", PenilaianController.addNewNilaiByKrsId);
router.get("/praktikan/:kelasID", PenilaianController.getAllPraktikanByKelasId);
router.get("/rekap/:kelasID", PenilaianController.getAllNilaiByKelasId);
router.get("/:krsID", PenilaianController.getNilaiByKrsId);
router.put("/:id", PenilaianController.updateNilaiById);
router.delete("/:krsID", PenilaianController.deleteNilaiByKrsId);

module.exports = router;
