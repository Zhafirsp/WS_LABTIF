const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const sevimaRoutes = require("./sevima");
const userRoutes = require("./user");

router.use("/auth", authRoutes);
router.use("/sevima", sevimaRoutes);
router.use("/users", userRoutes);

module.exports = router;
