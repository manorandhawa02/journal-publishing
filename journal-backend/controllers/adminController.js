const User = require("../models/User");
const Paper = require("../models/Paper");
const Review = require("../models/Review");

// ================= REVIEWERS =================
exports.getReviewers = async (req, res) => {
  try {
    const reviewers = await User.find({
      role: "reviewer",
      profileCompleted: true,
    }).select(
      "_id name email institution designation journalCategory expertiseAreas activeAssignments reviewsCompleted experienceYears",
    );

    res.json(reviewers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Asign Reviewer
exports.assignReviewers = async (req, res) => {
  try {
    const { reviewerIds } = req.body;

    console.log("BODY:", req.body); // 🔥 DEBUG LINE

    if (!reviewerIds || reviewerIds.length === 0) {
      return res.status(400).json({
        message: "Reviewer not selected",
      });
    }

    const paper = await require("../models/Paper").findById(req.params.id);

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    paper.assignedReviewers = reviewerIds;

    paper.status = "Reviewer Assignment";

    paper.timeline.push({
      action: "Reviewers Assigned",
      by: req.user.id,
    });

    await paper.save();

    res.json({
      message: "Reviewer assigned successfully",
      paper,
    });
  } catch (error) {
    console.log("ASSIGN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get Author Stats
exports.getAuthorStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const total = await Paper.countDocuments({ submittedBy: userId });
    const underReview = await Paper.countDocuments({
      submittedBy: userId,
      status: "Under Review",
    });

    const accepted = await Paper.countDocuments({
      submittedBy: userId,
      status: "Accepted",
    });

    const rejected = await Paper.countDocuments({
      submittedBy: userId,
      status: "Rejected",
    });

    res.json({ total, underReview, accepted, rejected });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin stats
exports.getAdminStats = async (req, res) => {
  try {
    const total = await Paper.countDocuments();

    const submitted = await Paper.countDocuments({
      status: "Submitted",
    });

    const screening = await Paper.countDocuments({
      status: "Initial Screening",
    });

    const reviewerAssignment = await Paper.countDocuments({
      status: "Reviewer Assignment",
    });

    const reviewProgress = await Paper.countDocuments({
      status: "Review In Progress",
    });

    const minorRevision = await Paper.countDocuments({
      status: "Minor Revision",
    });

    const majorRevision = await Paper.countDocuments({
      status: "Major Revision",
    });

    const accepted = await Paper.countDocuments({
      status: "Accepted",
    });

    const published = await Paper.countDocuments({
      status: "Published",
    });

    const rejected = await Paper.countDocuments({
      status: "Rejected",
    });

    res.json({
      total,
      submitted,
      screening,
      reviewerAssignment,
      reviewProgress,
      minorRevision,
      majorRevision,
      accepted,
      published,
      rejected,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Recommended reviewers
exports.getRecommendedReviewers = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.paperId);

    if (!paper) {
      return res.status(404).json({
        message: "Paper not found",
      });
    }

    const reviewers = await User.find({
      role: "reviewer",
      profileCompleted: true,
    });

    const rankedReviewers = reviewers.map((reviewer) => {
      let score = 0;

      // Category Match
      if (reviewer.journalCategory === paper.journalCategory) {
        score += 40;
      }

      // Expertise Match
      const matchedKeywords =
        reviewer.expertiseAreas?.filter((area) =>
          paper.keywords?.some(
            (keyword) =>
              keyword.toLowerCase().trim() === area.toLowerCase().trim(),
          ),
        ).length || 0;

      score += matchedKeywords * 15;

      // Experience
      score += reviewer.experienceYears || 0;

      // Review History
      score += reviewer.reviewsCompleted || 0;

      // Workload
      score -= (reviewer.activeAssignments || 0) * 5;

      return {
        reviewer,
        score,
      };
    });

    rankedReviewers.sort((a, b) => b.score - a.score);

    res.json(rankedReviewers);

    const filtered = rankedReviewers.filter((item) => item.reviewer);
    res.json(filtered);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  console.log("PAPER CATEGORY:", paper.journalCategory);

  console.log("REVIEWERS FOUND:", reviewers.length);
};
