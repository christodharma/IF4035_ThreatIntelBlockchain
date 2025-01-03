const express = require("express");
const multer = require("multer");
const router = express.Router();
const { uploadFile, handleDownload } = require("../controllers/ipfsController");
const handleMulterError = require("../middlewares/errorHandlerLimit");
const apiKeyValidator = require("../middlewares/apiKeyValidator");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }, 
});

router.use(apiKeyValidator);

router.post("/upload", upload.single("file"), handleMulterError, uploadFile);
router.get("/download", handleDownload);

module.exports = router;
