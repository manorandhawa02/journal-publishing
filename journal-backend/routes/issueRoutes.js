const express = require("express");
const router = express.Router();

const {
  createIssue,
  getIssues,
  seedIssue,
} = require("../controllers/issueController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post(
  "/create",
  protect,
  authorizeRoles("admin"),
  createIssue
);

router.get("/", getIssues);
router.get("/seed", seedIssue);

module.exports = router;