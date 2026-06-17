const express = require("express");
const router = express.Router();

const {
  createIssue,
  getIssues,
  seedIssue,
  uploadIssuePdf,
} = require("../controllers/issueController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post(
  "/create",
  protect,
  authorizeRoles("admin"),
  createIssue
);

router.get("/", getIssues);
router.get("/seed", seedIssue);
router.put(
  "/:id/pdf",
  protect,
  authorizeRoles("admin"),
  upload.single("file"),
  uploadIssuePdf
);

module.exports = router;