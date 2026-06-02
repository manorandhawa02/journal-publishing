const Issue = require("../models/Issue");
const PublishedPaper = require("../models/PublishedPaper");


// Create Issues
exports.createIssue = async (req, res) => {
  try {
    const { volume, issue } = req.body;
    const existingIssue = await Issue.findOne({
      volume,
      issue,
    });

    if (existingIssue) {
      return res.status(400).json({
        message: "Issue already exists",
      });
    }

    const newIssue = await Issue.create({
      volume,
      issue,
      year: new Date().getFullYear(),
    });

    res.json(newIssue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Issues
exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
  .populate({
    path: "papers",
    select:
      "title authors doi volume issue publishedAt",
  })
  .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Seed Issues
exports.seedIssue = async (req, res) => {
  try {
    const papers = await PublishedPaper.find();

    const issue = await Issue.create({
      volume: 1,
      issue: 1,
      year: new Date().getFullYear(),
      papers: papers.map((p) => p._id),
    });

    res.json(issue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};