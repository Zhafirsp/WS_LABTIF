const express = require("express");
const router = express.Router();

const JadwalController = require("../controllers/jadwalController");

// GET All Data Jadwal Praktikum By Periode
router.get("/praktiks/:periode", JadwalController.getAllPraktikByPeriode);

// Add New Jadwal Piket by Kelas ID
router.post("/piket/:kelasID", JadwalController.addPiketByKelasId);

// GET All Data Jadwal Piket
router.get("/pikets", JadwalController.getAllPiket);

// GET All Data Jadwal Piket by Kelas ID
router.get("/pikets/:kelasID", JadwalController.getPiketByKelasId);

// UPDATE Data Jadwal Piket by Piket ID
router.put("/piket/:piketID", JadwalController.updatePiketByKelasId);

// DELETE Jadwal Piket By Kelas ID --> Menghapus semua jadwal piket yang ada pada kelas id
router.delete("/pikets/:kelasID", JadwalController.deletePiketByKelasId);

// DELETE Data Jadwal Piket by Piket ID --> Menghapus hanya jadwal piket tertentu yang ada pada jadwal praktikum id
router.delete("/piket/:piketID", JadwalController.deletePiketById);

module.exports = router;
