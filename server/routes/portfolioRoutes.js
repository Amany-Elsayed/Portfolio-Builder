const express = require("express");
const {
  createOrUpdatePortfolio,
  getMyPortfolio,
  getPublicPortfolio,
  uploadProfileImage,
  uploadProjectImages,
} = require("../controllers/portfolioController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();


router
  .route("/")
  .post(protect, createOrUpdatePortfolio)
  .put(protect, createOrUpdatePortfolio);
router.post(
  "/upload-profile-image",
  protect,
  upload.single("image"),
  uploadProfileImage,
);
router.post(
  "/projects/:projectId/images",
  protect,
  upload.array("images", 5),
  uploadProjectImages,
);
router.get("/me", protect, getMyPortfolio);
router.get("/:username", getPublicPortfolio);

module.exports = router;
