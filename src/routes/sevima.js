const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");

const SevimaController = require("../controllers/sevimaController");

// router.use(Authenticated);
// router.use(Authorization.verifyLaboranOrAsisten);

// GET All Data Jadwal Praktikum By Periode
router.get("/jadwalpraktikum", SevimaController.getAllJadwalByPeriode);

// GET All Mahasiswa By Periode
router.get("/mahasiswa", SevimaController.getAllMahasiswaByPeriode);

// GET All Praktikan By Kelas ID
router.get("/praktikan", SevimaController.getAllPraktikanByKelasId);

// router.use(Authorization.verifyLaboran);

// UPDATE data SEVIMA into database
router.post("/mahasiswa", SevimaController.updateDataMahasiswa);
router.post("/dosen", SevimaController.updateDataDosen);
router.post("/matakuliah", SevimaController.updateDataMatkul);
router.post("/kelas", SevimaController.updateDataKelas);
router.post("/jadwalpraktikum", SevimaController.updateDataJadwal);
router.post("/krs", SevimaController.updateDataKrs);

module.exports = router;
