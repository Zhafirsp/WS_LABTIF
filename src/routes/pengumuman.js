const express = require("express");
const router = express.Router();

const Authenticated = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");
const uploadFile = require("../middleware/uploadFile");

const PengumumanController = require("../controllers/pengumumanController");

// router.use(Authenticated);
// Menampilkan data pengumuman
router.get("/", PengumumanController.getAllPengumuman);
router.get("/active", PengumumanController.getPengumumanActive);
router.get("/:id", PengumumanController.getPengumumanById);

// router.use(Authorization.verifyLaboran);
// Mengelola data pengumuman
router.post(
  "/",
  uploadFile.single("dokumen"),
  PengumumanController.addPengumuman
);
router.put(
  "/:id",
  uploadFile.single("dokumen"),
  PengumumanController.updatePengumumanById
);
router.delete("/:id", PengumumanController.deletePengumumanById);

module.exports = router;
