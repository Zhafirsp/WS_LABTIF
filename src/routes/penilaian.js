const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");
const PenilaianController = require("../controllers/penilaianController");

// router.use(Authenticated);
// router.use(Authorization.verifyAsisten);

// Menampilkan data penilaian
// GET All NIlai By Kelas ID
router.get("/rekap/:kelasID", PenilaianController.getAllNilaiByKelasId);

// GET Nilai By KRS ID
router.get("/:krsID", PenilaianController.getNilaiByKrsId);

// Mengelola data penilaian
// Add New Penilaian
router.post("/:krsID", PenilaianController.addNilaiByKrsId);

// UPDATE Nilai By Nilai ID
router.put("/:id", PenilaianController.updateNilaiById);

// DELETE Nilai By KRS ID
router.delete("/:krsID", PenilaianController.deleteNilaiByKrsId);

module.exports = router;
