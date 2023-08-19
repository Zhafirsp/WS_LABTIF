const express = require("express");
const router = express.Router();
const SevimaController = require("../controllers/sevimaController");

// UPDATE data SEVIMA into database
router.post("/mahasiswa", SevimaController.updateDataMahasiswa);
router.post("/dosen", SevimaController.updateDataDosen);
router.post("/matakuliah", SevimaController.updateDataMatkul);
router.post("/kelas", SevimaController.updateDataKelas);
router.post("/jadwalpraktikum", SevimaController.updateDataJadwal);
router.post("/krs", SevimaController.updateDataKRS);

// GET All Data Jadwal Praktikum By Periode
router.get("/jadwalpraktikum", SevimaController.getAllJadwalByPeriode);

// GET All Praktikan By Kelas ID
router.get("/praktikan/:kelasID", SevimaController.getAllPraktikanByKelasId);

module.exports = router;
