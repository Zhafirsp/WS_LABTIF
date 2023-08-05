const express = require("express");
const router = express.Router();

const JadwalController = require("../controllers/jadwalController");

// GET Data Jadwal Praktikum By Periode
router.get(
  "/jadwalpraktik/periode/:periode",
  JadwalController.getAllPraktikByPeriode
);
router.post("/praktik/:praktikID", JadwalController.addPiketByPraktikId);
router.delete("/piket/:piketID", JadwalController.deletePiketByPiketId);

module.exports = router;
