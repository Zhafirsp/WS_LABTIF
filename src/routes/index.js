const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const sevimaRoutes = require("./sevima");
const userRoutes = require("./user");
const laboranRoutes = require("./laboran");
const asistenRoutes = require("./asisten");
const programRoutes = require("./program");
const pendaftaranRoutes = require("./pendaftaran");

router.use("/auth", authRoutes);
router.use("/sevima", sevimaRoutes);
router.use("/users", userRoutes);
router.use("/laborans", laboranRoutes);
router.use("/asistens", asistenRoutes);
router.use("/programs", programRoutes);
router.use("/pendaftarans", pendaftaranRoutes);

module.exports = router;
