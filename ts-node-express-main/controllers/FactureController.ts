  import { Request, Response } from 'express';
  import multer from 'multer';
  import path from 'path';
  import ocr from 'tesseract.js';
  
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
    facturéÀ: /Client\s+([A-Za-zÀ-ÿ\s'-]+)/,
    destinataireEntreprise: /TECHNIC BUREAU TAFRAOUT\n.*?(?=\d{2}[\/]\d{2}[\/]\d{4})/,
    adresse: /146, RUE IBNOU MOUNIR MAARIF.*?CASABLANCA/,
    téléphone: /(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,3}\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}/,
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
    dateFacture: /\d{2}[\/]\d{2}[\/]\d{4}/,
    numéroFacture: /Devis:\s*([\w-]+)/,
    numéroCommande: /Commande n°\s*([\w-]+)/,
    référenceDevis: /Référence devis\s*([\w-]+)/,
    dateÉchéance: /Échéance au\s+(\d{2}[\/]\d{2}[\/]\d{4})/,
    descriptionArticle: /([A-Za-z0-9À-ÿ\s'-]+)\n+([\d\,\.]+)\s*([A-Za-z]*)\s*\d*\s*([\d\,\.]+)/,
    quantité: /\d+(?:\.\d+)?/,
    prixUnitaire: /\d+(?:[.,]\d{1,2})?/,
    prixTotal: /\d+(?:[.,]\d{1,2})?/,
    sousTotal: /Sous Total HT\s+([\d\,\.]+)/,
    TVA: /TVA\s+([\d\,\.]+)%/,
    autresFrais: /Frais d'installation\s+([\d\,\.]+)/,
    total: /Arrêté le présent devis à la somme de: ([\d\,\.]+) Dirham/,
    conditionsPaiement: /Modalités de paiement:\s*(.*)/,
    IBAN: /IBAN\s+([A-Z]{2}\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4})/,
    SWIFT: /[A-Z]{4}[A-Z2-9]{2}\w{0,11}/,
    nomImprimé: /Signé\s+([A-Za-zÀ-ÿ\s'-]+)/,
    dateSignature: /Le\s+(\d{2}[\/]\d{2}[\/]\d{4})/,
  };
  
  async function handleFileUpload(req: Request, res: Response) {
    try {
      // Use optional chaining to safely access req.file
      const imagePath = `./upload/images/${req.file?.filename}`;
  
      if (!imagePath) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }
  
      const { data } = await ocr.recognize(imagePath, "eng", {
        logger: (e) => console.log(e),
      });
  
      const extractedText = data.text;
  
      // Join lines to handle multiline matches
      const joinedText = extractedText.split('\n').join(' ');
  
      // Type assertion for extractedFields object
      const extractedFields: { [key: string]: string | null } = {};
      for (const key in invoiceRegex) {
        const regex = invoiceRegex[key];
        const matches = joinedText.match(regex);
        if (matches) {
          extractedFields[key] = matches[1] ? matches[1].trim() : matches[0].trim();
        } else {
          extractedFields[key] = null;
        }
      }
  
      // Post-process to clean data if needed
      if (extractedFields.dateFacture) {
        extractedFields.dateFacture = formatDate(extractedFields.dateFacture);
      }
      if (extractedFields.dateÉchéance) {
        extractedFields.dateÉchéance = formatDate(extractedFields.dateÉchéance);
      }
      // Add more post-processing as required
  
      res.json({
        success: true,
        message: "Text extracted successfully",
        extractedFields: extractedFields,
      });
    } catch (error) {
      console.error("Error during OCR:", error);
      res.status(500).json({ success: false, message: "OCR operation failed" });
    }
  }
  
  function formatDate(dateStr: string) {
    // Example function to format date strings if needed
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  }
  
  export default {
    handleFileUpload,
    upload,
  };