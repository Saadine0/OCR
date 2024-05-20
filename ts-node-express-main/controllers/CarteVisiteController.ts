const fs = require("fs");
const multer = require("multer");
const path = require("path");
const ocr = require("tesseract.js");

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

const invoiceRegex = {
  gmail: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\b/g,
  website: /(?:(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)(?!\S*@)/g,
  phone: /\+?\d{0,3}[-.\s()]?\d{1,4}[-.\s()]?\d{1,4}[-.\s()]?\d{1,9}/g,
};
const addressRegex = /(?:\d+\s*(?:etage|etg|étage|étg))?\s*(?:(?:,|\band\b)\s*)*(?:\bimmeuble\b|\bimm\b\s*\d+)?\s*(?:(?:,|\band\b)\s*)*\b\d+\b/g;

async function handleFileUpload(req, res) {
  try {
    const imagePath = `./upload/images/${req.file.filename}`;
    const { data } = await ocr.recognize(imagePath, "eng", {
      logger: (e) => console.log(e),
    });
    const extractedText = data.text;

    // Extraction des champs de la facture
    const extractedFields = {};
    for (const key in invoiceRegex) {
      const regex = invoiceRegex[key];
      const matches = [...extractedText.matchAll(regex)]; // Using matchAll to get all matches
      extractedFields[key] = matches.map(match => match[0].trim()); // Extracting the matched text
    }

    const extractedAddresses = extractedText.match(addressRegex);
    const concatenatedAddresses = extractedAddresses ? extractedAddresses.join(", ") : null;

    res.json({
      success: true,
      message: "Text extracted successfully",
      extractedFields: extractedFields,
      extractedAddresses: concatenatedAddresses,
    });
  } catch (error) {
    console.error("Error during OCR:", error);
    res.status(500).json({ success: false, message: "OCR operation failed" });
  }
}

export = {
  handleFileUpload,
  upload,
};
