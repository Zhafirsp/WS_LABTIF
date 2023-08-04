const express = require("express");
const router = express.Router();

const JadwalController = require("../controllers/jadwalController");

router.get("/", JadwalController.getAllPiket);
router.post("/:praktikID", JadwalController.addPiketByPraktikId);

module.exports = router;
