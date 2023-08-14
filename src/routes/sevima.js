const express = require("express");
const router = express.Router();
const SevimaController = require("../controllers/sevimaController");

// router.post("/update-all-data", SevimaController.updateAllDataFromSevima);
router.post("/mahasiswa", SevimaController.updateDataMahasiswa);
router.post("/dosen", SevimaController.updateDataDosen);
router.post("/matakuliah", SevimaController.updateDataMatkul);
router.post("/kelas", SevimaController.updateDataKelas);
router.post("/jadwalpraktik", SevimaController.updateDataJadwal);
router.post("/krs", SevimaController.updateDataKRS);

module.exports = router;
