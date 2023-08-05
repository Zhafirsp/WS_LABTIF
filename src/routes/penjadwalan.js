const express = require("express");
const router = express.Router();

const JadwalController = require("../controllers/jadwalController");

// GET All Data Jadwal Praktikum By Periode
router.get("/praktiks/:periode", JadwalController.getAllPraktikByPeriode);

// Add New Jadwal Piket by Praktik ID
router.post("/piket/:praktikID", JadwalController.addPiketByPraktikId);

// GET All Data Jadwal Piket
router.get("/pikets", JadwalController.getAllPiket);

// GET All Data Jadwal Piket by Praktik ID
router.get("/pikets/:praktikID", JadwalController.getPiketByPraktikId);

// UPDATE Data Jadwal Piket by Piket ID
router.put("/piket/:piketID", JadwalController.updatePiketByPiketId);

// DELETE Jadwal Piket By Praktik ID --> Menghapus semua jadwal piket yang ada pada jadwal praktikum id
router.delete("/pikets/:praktikID", JadwalController.deletePiketByPraktikId);

// DELETE Data Jadwal Piket by Piket ID --> Menghapus hanya jadwal piket tertentu yang ada pada jadwal praktikum id
router.delete("/piket/:piketID", JadwalController.deletePiketById);

module.exports = router;
