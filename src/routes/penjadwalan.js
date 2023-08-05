const express = require("express");
const router = express.Router();

const JadwalController = require("../controllers/jadwalController");

router.get("/", JadwalController.getAllPiket);
router.post("/praktik/:praktikID", JadwalController.addPiketByPraktikId);
router.delete("/piket/:piketID", JadwalController.deletePiketByPiketId);

module.exports = router;
