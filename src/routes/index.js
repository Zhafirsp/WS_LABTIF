const express = require("express");
const router = express.Router();
const { resSend } = require("../helpers/response");

const authRoutes = require("./auth");
const sevimaRoutes = require("./sevima");
const userRoutes = require("./user");
const laboranRoutes = require("./laboran");
const asistenRoutes = require("./asisten");
const programRoutes = require("./program");
const pendaftaranRoutes = require("./pendaftaran");
const penjadwalanRoutes = require("./penjadwalan");

// Check pink
router.get("/ping", (req, res) => {
  resSend(200, "Success! Server is Ready", null, res);
});

router.use("/auth", authRoutes);
router.use("/sevima", sevimaRoutes);
router.use("/users", userRoutes);
router.use("/laborans", laboranRoutes);
router.use("/asistens", asistenRoutes);
router.use("/programs", programRoutes);
router.use("/pendaftarans", pendaftaranRoutes);
router.use("/penjadwalans", penjadwalanRoutes);

module.exports = router;
