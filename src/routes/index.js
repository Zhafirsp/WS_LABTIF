const express = require("express");
const router = express.Router();
const { resSend } = require("../helpers/response");

const authRoutes = require("./auth");
const sevimaRoutes = require("./sevima");
const userRoutes = require("./user");
const profileRoutes = require("./profile");
const laboranRoutes = require("./laboran");
const asistenRoutes = require("./asisten");
const pengumumanRoutes = require("./pengumuman");
const programRoutes = require("./program");
const pendaftaranRoutes = require("./pendaftaran");
const penjadwalanRoutes = require("./penjadwalan");
const kehadiranRoutes = require("./kehadiran");
const penilaianRoutes = require("./penilaian");

// Check pink
router.get("/ping", (req, res) => {
  resSend(200, "Success! Server is Ready", null, res);
});

router.use("/auth", authRoutes);
router.use("/sevima", sevimaRoutes);
router.use("/users", userRoutes);
router.use("/profile", profileRoutes);
router.use("/laborans", laboranRoutes);
router.use("/asistens", asistenRoutes);
router.use("/pengumuman", pengumumanRoutes);
router.use("/programs", programRoutes);
router.use("/pendaftarans", pendaftaranRoutes);
router.use("/jadwalpikets", penjadwalanRoutes);
router.use("/kehadiran", kehadiranRoutes);
router.use("/penilaian", penilaianRoutes);

module.exports = router;
