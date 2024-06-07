import { Request, Response } from "express";
import mysql from "mysql";

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // Replace with your actual password
  database: "ocr"
});

interface ExtractedFields {
  gmail: string[];
  website: string[];
  phone: string[];
}

interface Data {
  extractedFields: ExtractedFields;
  extractedAddresses: string;
}

export const saveData = (req: Request, res: Response) => {
  const data: Data = req.body;
  const DocumentID = 2; // Example DocumentID, adjust as necessary

  const sql = `INSERT INTO extractedentities (DocumentID, EntityID, ExtractedValue) VALUES (?, ?, ?)`;

  // Insert emails
  data.extractedFields.gmail.forEach(email => {
    const emailValues = [DocumentID, 1, email];
    pool.query(sql, emailValues, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error saving data");
        return;
      }
    });
  });

  // Insert websites
  data.extractedFields.website.forEach(website => {
    const websiteValues = [DocumentID, 2, website];
    pool.query(sql, websiteValues, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error saving data");
        return;
      }
    });
  });

  // Insert phones
  data.extractedFields.phone.forEach(phone => {
    const phoneValues = [DocumentID, 3, phone];
    pool.query(sql, phoneValues, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error saving data");
        return;
      }
    });
  });

  // Insert extracted addresses
  const addressValues = [DocumentID, 4, data.extractedAddresses];
  pool.query(sql, addressValues, (error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error saving data");
      return;
    }
    res.status(200).send("Data saved successfully");
  });
};
