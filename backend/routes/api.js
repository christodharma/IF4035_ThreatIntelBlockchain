const express = require("express");
const multer = require("multer");
const router = express.Router();
const { uploadFile, handleDownload } = require("../controllers/ipfsController");
const handleMulterError = require("../middlewares/errorHandler");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }, 
});

router.post("/upload", upload.single("file"), handleMulterError, uploadFile);
router.get("/download", handleDownload);

module.exports = router;
