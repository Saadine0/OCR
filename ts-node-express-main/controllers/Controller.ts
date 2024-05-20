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

async function handleFileUpload(req, res) {
  try {
    const imagePath: string = `./upload/images/${req.file.filename}`; 
    console.log(req.file);

    const { data } = await ocr.recognize(imagePath, "eng", {
      logger: (e: any) => console.log(e), 
    });

    const extractedText: string = data.text;

    res.json({
      success: true,
      message: "Text extracted successfully",
      extractedText: extractedText,
    });
  } catch (error) {
    console.error("Error during OCR:", error);
    res.status(500).json({ success: false, message: "OCR operation failed" });
  }
}

export default {
  handleFileUpload,
  upload,
};