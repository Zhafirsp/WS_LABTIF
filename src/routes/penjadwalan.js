const express = require("express");
const router = express.Router();

const JadwalController = require("../controllers/jadwalController");

// Add New Jadwal Piket by Kelas ID
router.post("/:kelasID", JadwalController.addPiketByKelasId);

// GET All Data Jadwal Piket by Periode
router.get("/", JadwalController.getAllPiketByPeriode);

// GET All Data Jadwal Piket by Kelas ID
router.get("/:kelasID", JadwalController.getPiketByKelasId);

// UPDATE Data Jadwal Piket by Kelas ID dan asisten ID
router.put("/:kelasID/:asistenID", JadwalController.updatePiketByKelasAslabID);

// DELETE Jadwal Piket By Kelas ID --> Menghapus semua jadwal piket yang ada pada kelas id
router.delete("/:kelasID", JadwalController.deletePiketByKelasId);

// DELETE Data Jadwal Piket by Asisten ID --> Menghapus semua jadwal piket yang ada pada asisten id
router.delete(
  "/:kelasID/:asistenID",
  JadwalController.deletePiketByByKelasAslabID
);

module.exports = router;
