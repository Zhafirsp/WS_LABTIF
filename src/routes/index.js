const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const sevimaRoutes = require("./sevima");
const userRoutes = require("./user");
const laboranRoutes = require("./laboran");

router.use("/auth", authRoutes);
router.use("/sevima", sevimaRoutes);
router.use("/users", userRoutes);
router.use("/laborans", laboranRoutes);

module.exports = router;
