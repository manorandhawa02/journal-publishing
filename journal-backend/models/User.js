const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "author", "reviewer"],
    default: "author",
  },

  orcid: {
    type: String,
    default: "",
  },

  journalCategory: {
    type: String,
    enum: [
      "Artificial Intelligence",
      "Computer Science",
      "Software Engineering",
      "Data Science",
      "Cyber Security",
      "Healthcare",
      "Blockchain",
      "IoT",
      "Cloud Computing",
    ],
    default: "Computer Science",
  },

  // ================= REVIEWER PROFILE =================

  institution: {
    type: String,
    default: "",
  },

  designation: {
    type: String,
    default: "",
  },

  experienceYears: {
    type: Number,
    default: 0,
  },

  bio: {
    type: String,
    default: "",
  },

  expertiseAreas: [
    {
      type: String,
    },
  ],

  researchInterests: [
    {
      type: String,
    },
  ],

  reviewsCompleted: {
    type: Number,
    default: 0,
  },

  activeAssignments: {
    type: Number,
    default: 0,
  },

  profileCompleted: {
    type: Boolean,
    default: false,
  },

  googleId: {
    type: String,
    default: "",
  },
},
{ timestamps: true }
);




module.exports = mongoose.model("User", userSchema);