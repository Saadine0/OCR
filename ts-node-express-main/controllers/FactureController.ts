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
  facturéÀ: /[A-Za-zÀ-ÿ\s'-]+/g,
  destinataireEntreprise: /[A-Za-z0-9\s'-]+/g,
  adresse: /[0-9A-Za-zÀ-ÿ\s'-]+/g,
  téléphone: /(?:\+?\d{1,3}[-.\s]?)?\(?(?:\d{2,3})\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}/g,
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
  dateFacture: /\d{2}[/]\d{2}[/]\d{4}/g,
  numéroFacture: /[\w-]+/g,
  numéroCommande: /[\w-]+/g,
  référenceDevis: /[\w-]+/g,
  dateÉchéance: /\d{2}[/]\d{2}[/]\d{4}/g,
  descriptionArticle: /.+/g,
  quantité: /\d+(\.\d+)?/g,
  prixUnitaire: /\d+(?:[.,]\d{1,2})?/g,
  prixTotal: /\d+(?:[.,]\d{1,2})?/g,
  sousTotal: /\d+(?:[.,]\d{1,2})?/g,
  TVA: /\d+(?:[.,]\d{1,2})?/g,
  autresFrais: /\d+(?:[.,]\d{1,2})?/g,
  total: /\d+(?:[.,]\d{1,2})?/g,
  conditionsPaiement: /.+/g,
  IBAN: /FR\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{2}/g,
  SWIFT: /[A-Z]{4}FR[A-Z2-9]{2}\w{0,11}/g,
  nomImprimé: /[A-Za-zÀ-ÿ\s'-]+/g,
  dateSignature: /\d{2}[/]\d{2}[/]\d{4}/g,
};

async function handleFileUpload(req, res) {
  try {
    const imagePath = `./upload/images/${req.file.filename}`;

    const { data } = await ocr.recognize(imagePath, "eng", {
      logger: (e) => console.log(e),
    });

    const extractedText = data.text;

    // Split the text into lines
    const lines = extractedText.split('\n');

    // Extraction des champs de la facture
    const extractedFields = {};
    for (const key in invoiceRegex) {
      const regex = invoiceRegex[key];
      let match: RegExpMatchArray | null = null; // Define match as possibly null
      for (const line of lines) {
        match = line.match(regex);
        if (match) break; // Break if a match is found in the current line
      }
      extractedFields[key] = match ? match[0].trim() : null; // Use match without null check
    }

    res.json({
      success: true,
      message: "Text extracted successfully",
      extractedFields: extractedFields,
    });
  } catch (error) {
    console.error("Error during OCR:", error);
    res
      .status(500)
      .json({ success: false, message: "OCR operation failed" });
  }
}

export default {
  handleFileUpload,
  upload,
};
