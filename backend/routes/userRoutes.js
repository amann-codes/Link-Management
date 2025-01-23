const express = require("express");
const { updateProfile, deleteAccount } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.put("/profile", protect, updateProfile);
router.delete("/account", protect, deleteAccount);

module.exports = router;
