const fs = require("fs/promises");

async function assertValidPdfFile(filePath) {
  const fileBuffer = await fs.readFile(filePath);

  if (fileBuffer.length < 4) {
    throw new Error("Uploaded file is too small to be a valid PDF");
  }

  const header = fileBuffer.subarray(0, 4).toString("utf8");

  if (header !== "%PDF") {
    throw new Error("Uploaded file is not a valid PDF");
  }
}

module.exports = {
  assertValidPdfFile,
};