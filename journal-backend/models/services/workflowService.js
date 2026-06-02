const Paper = require("../models/Paper");

exports.updatePaperStatus = async (paperId) => {
  const paper = await Paper.findById(paperId).populate("reviews");

  if (!paper) return;

  if (!paper.reviews.length) return;

  const allSubmitted = paper.reviews.every(
    (r) => r.status === "Submitted"
  );

  if (allSubmitted) {
    paper.status = "Under Editorial Decision";

    paper.timeline.push({
      action: "All reviews completed",
    });

    await paper.save();
  }
};