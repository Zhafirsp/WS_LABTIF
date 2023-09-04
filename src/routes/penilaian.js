const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");
const PenilaianController = require("../controllers/penilaianController");

router.use(Authenticated);

// Add New Penilaian
router.post(
  "/:krsID",
  Authorization.verifyAsisten,
  PenilaianController.addNilaiByKrsId
);

// GET All NIlai By Kelas ID
router.get("/rekap/:kelasID", PenilaianController.getAllNilaiByKelasId);

// GET Nilai By KRS ID
router.get("/:krsID", PenilaianController.getNilaiByKrsId);

// UPDATE Nilai By Nilai ID
router.put(
  "/:id",
  Authorization.verifyAsisten,
  PenilaianController.updateNilaiById
);

// DELETE Nilai By KRS ID
router.delete(
  "/:krsID",
  Authorization.verifyAsisten,
  PenilaianController.deleteNilaiByKrsId
);

module.exports = router;
