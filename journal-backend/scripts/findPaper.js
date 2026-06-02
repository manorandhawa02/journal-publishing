require('dotenv').config();
const mongoose = require('mongoose');
const Paper = require('../models/Paper');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/journal';
const id = process.argv[2];

if (!id) {
  console.error('Usage: node scripts/findPaper.js <paperId>');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const paper = await Paper.findById(id).lean();

    if (!paper) {
      console.log('Paper not found');
      process.exit(0);
    }

    console.log('Paper found:');
    console.log(JSON.stringify(paper, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();