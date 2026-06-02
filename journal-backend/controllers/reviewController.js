const Paper = require("../models/Paper");
const Review = require("../models/Review");

// ======================================================
// ASSIGN REVIEWER
// ======================================================
exports.assignReviewer = async (req, res) => {
  try {
    const { reviewerId } = req.body;
    const paperId = req.params.id;

    const paper = await Paper.findById(paperId);

    if (!paper) {
      return res.status(404).json({
        message: "Paper not found",
      });
    }

    paper.assignedReviewers = paper.assignedReviewers || [];
    paper.reviews = paper.reviews || [];

    const alreadyAssigned = paper.assignedReviewers.some(
      (id) => id.toString() === reviewerId,
    );

    if (alreadyAssigned) {
      return res.status(400).json({
        message: "Reviewer already assigned",
      });
    }

    paper.assignedReviewers.push(reviewerId);

    const review = await Review.create({
      paper: paper._id,
      reviewer: reviewerId,
    });

    paper.reviews.push(review._id);

    paper.status = "Review In Progress";

    paper.timeline.push({
      action: "Reviewer Assigned",
      by: req.user.id,
      date: new Date(),
    });

    await paper.save();

    await paper.populate("assignedReviewers", "name email");

    res.json({
      message: "Reviewer assigned successfully",
      paper,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// SUBMIT REVIEW
// ======================================================
exports.submitReview = async (req, res) => {
  try {
    const paperId = req.params.id;

    const { commentsToAuthor, confidentialComments, recommendation, rating } =
      req.body;

    const review = await Review.findOne({
      paper: paperId,
      reviewer: req.user.id,
    });

    if (!review) {
      return res.status(404).json({
        message: "Review record not found. Paper not assigned.",
      });
    }

    review.commentsToAuthor = commentsToAuthor;
    review.confidentialComments = confidentialComments;
    const validRecommendations = [
      "Accept",
      "Minor Revision",
      "Major Revision",
      "Reject",
    ];

    if (!validRecommendations.includes(recommendation)) {
      return res.status(400).json({
        message: "Invalid recommendation",
      });
    }
    review.recommendation = recommendation;
    review.rating = Number(rating);

    review.status = "Submitted";
    review.submittedAt = new Date();

    await review.save();

    const paper = await Paper.findById(paperId);

    if (!paper) {
      return res.status(404).json({
        message: "Paper not found",
      });
    }

    if (recommendation === "Accept") {
      paper.status = "Accepted";
    } else if (recommendation === "Reject") {
      paper.status = "Rejected";
    } else if (recommendation === "Minor Revision") {
      paper.status = "Minor Revision";
    } else if (recommendation === "Major Revision") {
      paper.status = "Major Revision";
    }

    paper.timeline.push({
      action: `Reviewer recommendation: ${recommendation}`,
      by: req.user.id,
      date: new Date(),
    });

    await paper.save();

    res.json({
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// REVIEWER PAPERS
// ======================================================
exports.getAssignedPapers = async (req, res) => {
  try {
    const papers = await Paper.find({
      assignedReviewers: {
        $in: [req.user.id],
      },
    })
      .populate("submittedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(papers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
