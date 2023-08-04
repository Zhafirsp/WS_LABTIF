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

// Check pink
router.get("/ping", (req, res) => {
  resSend(200, "Success! Server is Ready", null, res);
});

// Welcome Page
router.get("/", (req, res) => {
  res.send(`<h1>Hello Welcome to LABTIF API!</h1>`);
});

router.use("/auth", authRoutes);
router.use("/sevima", sevimaRoutes);
router.use("/users", userRoutes);
router.use("/laborans", laboranRoutes);
router.use("/asistens", asistenRoutes);
router.use("/programs", programRoutes);
router.use("/pendaftarans", pendaftaranRoutes);

module.exports = router;
