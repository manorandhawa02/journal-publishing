const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  getReviewers,
  getAdminStats,
  getAuthorStats,
  getRecommendedReviewers,
} = require("../controllers/adminController");

// ================= ADMIN STATS =================
router.get(
  "/stats",
  protect,
  authorizeRoles("admin"),
  getAdminStats
);

// ================= AUTHOR STATS =================
router.get(
  "/author-stats",
  protect,
  getAuthorStats
);

// ================= REVIEWERS =================
router.get(
  "/reviewers",
  protect,
  authorizeRoles("admin"),
  getReviewers
);


router.get(
  "/recommended-reviewers/:paperId",
  protect,
  authorizeRoles("admin"),
  getRecommendedReviewers
);



module.exports = router;