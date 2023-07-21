const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const sevimaRoutes = require("./sevima");
const userRoutes = require("./user");
const laboranRoutes = require("./laboran");
const asistenRoutes = require("./asisten");

router.use("/auth", authRoutes);
router.use("/sevima", sevimaRoutes);
router.use("/users", userRoutes);
router.use("/laborans", laboranRoutes);
router.use("/asistens", asistenRoutes);

module.exports = router;
