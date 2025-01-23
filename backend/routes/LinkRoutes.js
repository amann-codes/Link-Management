const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createLink,
  getLinks,
  getStats,
  trackClick,
} = require("../controllers/linkController");
const router = express.Router();

router.post("/", protect, createLink);
router.get("/", protect, getLinks);
router.get("/stats", protect, getStats);
router.get("/:shortUrl", trackClick);


module.exports = router;
