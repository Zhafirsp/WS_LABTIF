const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");

const JadwalController = require("../controllers/jadwalController");

// router.use(Authenticated);

// GET All Data Jadwal Piket by Periode
router.get("/", JadwalController.getAllPiketByPeriode);

// GET All Data Jadwal Piket by Kelas ID
router.get("/:kelasID", JadwalController.getPiketByKelasId);

// router.use(Authorization.verifyLaboran);

// Add New Jadwal Piket by Kelas ID
router.post("/:kelasID", JadwalController.addPiketByKelasId);

// UPDATE Data Jadwal Piket by Kelas ID dan asisten ID
router.put("/:aslabID", JadwalController.updatePiketByAslabId);

// DELETE Jadwal Piket By Kelas ID --> Menghapus semua jadwal piket yang ada pada kelas id
router.delete("/:kelasID", JadwalController.deletePiketByKelasId);

// DELETE Data Jadwal Piket by Asisten ID --> Menghapus semua jadwal piket yang ada pada asisten id
router.delete("/asisten/:aslabID", JadwalController.deletePiketByAslabId);

module.exports = router;
