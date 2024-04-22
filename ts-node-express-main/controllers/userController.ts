import { Request, Response } from 'express';
import { User } from '../models/userModel';
import * as userModel from '../models/userModel';
const { createWorker } = require('tesseract.js');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const ocr = require('tesseract.js');

async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users: User[] = await userModel.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function addUser(req: Request, res: Response): Promise<void> {
  try {
    const { Username, Lastname, Email }: User = req.body; 
    const userData: User = req.body as User; 
    console.log(userData); 
    const newUser: User = await userModel.addUser(userData); 
    res.status(201).json(newUser); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

async function handleFileUpload(req, res) {
  console.log(req.file.path);
  try {
    const imagePath: string = `./upload/images/${req.file.filename}`; // Path to the uploaded image

    // Perform OCR
    const { data } = await ocr.recognize(imagePath, 'eng', {
      logger: (e: any) => console.log(e), // Optional logger for debugging
    });

    const extractedText: string = data.text;

    // Store the extracted text to /upload/text_images directory
    const outputDir: string = './upload/text_images';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputPath: string = path.join(outputDir, `${req.file.filename}.txt`);
    fs.writeFileSync(outputPath, extractedText);

    // Respond with structured response
    res.json({
      success: true,
      message: 'Text extracted successfully',
      extractedText: extractedText,
      outputPath: outputPath, // Include the path to the stored text in the response
    });
  } catch (error) {
    console.error('Error during OCR:', error);
    res.status(500).json({ success: false, message: 'OCR operation failed' });
  }
}

export default {
  getUsers,
  addUser,
  handleFileUpload,
  upload,
};
