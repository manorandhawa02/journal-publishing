const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    volume: Number,

    issue: Number,

    year: Number,

    papers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PublishedPaper",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Issue",
  issueSchema
);