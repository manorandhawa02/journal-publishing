const PublishedPaper = require("../models/PublishedPaper");
const Paper = require("../models/Paper");
const User = require("../models/User");
const sendEmail = require("../utils/mailer");
const Issue = require("../models/Issue");
// ================= PUBLISH PAPER =================
exports.publishPaper = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({
        message: "Paper not found",
      });
    }

    // ONLY ACCEPTED PAPERS CAN BE PUBLISHED
    if (paper.status !== "Accepted") {
      return res.status(400).json({
        message: "Only accepted papers can be published",
      });
    }

    const year = new Date().getFullYear();

    const volume = year - 2024;

    const month = new Date().getMonth() + 1;

    const issue = month <= 6 ? 1 : 2;

    let currentIssue = await Issue.findOne().sort({
      createdAt: -1,
    });

    if (!currentIssue) {
      currentIssue = await Issue.create({
        volume: 1,
        issue: 1,
        year: new Date().getFullYear(),
        papers: [],
      });
    }

    // ISSUE FULL?
    if (currentIssue.papers.length >= 10) {
      let nextVolume = currentIssue.volume;
      let nextIssue = currentIssue.issue + 1;

      if (nextIssue > 3) {
        nextVolume += 1;
        nextIssue = 1;
      }

      currentIssue = await Issue.create({
        volume: nextVolume,
        issue: nextIssue,
        year: new Date().getFullYear(),
        papers: [],
      });
    }

    // CREATE PUBLISHED PAPER
    const published = await PublishedPaper.create({
      title: paper.title,

      authors: [paper.authorName],

      abstract: paper.abstract,

      fileUrl: paper.fileUrl,

      volume: currentIssue.volume,
      issue: currentIssue.issue,

      doi: `10.1234/SJPS.V${currentIssue.volume}I${currentIssue.issue}.${paper._id}`,
      category: paper.journalCategory,
    });

    currentIssue.papers.push(published._id);

    await currentIssue.save();

    // UPDATE STATUS
    paper.status = "Published";
    paper.timeline.push({
      action: "Published",
      by: req.user.id,
    });

    paper.publishedAt = new Date();

    await paper.save();

    const author = await User.findById(paper.submittedBy);

    await sendEmail(
      author.email,
      "Paper Published",
      `
  <h2>Publication Notice</h2>

  <p>
  Your paper
  <b>${paper.title}</b>
  has been published.
  </p>

  <p>
  DOI:
  ${published.doi}
  </p>
  `,
    );

    res.json({
      message: "Paper published successfully",
      published,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// ================= GET ALL =================
exports.getPublishedPapers = async (req, res) => {
  try {
    const papers = await PublishedPaper.find().sort({ createdAt: -1 });

    res.json(papers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET SINGLE =================
exports.getPublishedPaperById = async (req, res) => {
  try {
    const paper = await PublishedPaper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({
        message: "Paper not found",
      });
    }

    res.json(paper);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
