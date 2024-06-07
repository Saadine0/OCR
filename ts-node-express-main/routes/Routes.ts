import express, { Router } from "express";
import FactureController from "../controllers/FactureController";
import Controller from "../controllers/Controller";
import CarteVisiteController from "../controllers/CarteVisiteController";
import * as SaveDataController from "../controllers/SaveDataController"; // Import the new controller

const router: Router = express.Router();

router.use("/profile", express.static("upload/images"));
router.post("/Facture", FactureController.upload.single("facture"), FactureController.handleFileUpload);
router.post("/carteVisite", CarteVisiteController.upload.single("carteVisite"), CarteVisiteController.handleFileUpload);
router.post("/upload", Controller.upload.single("profile"), Controller.handleFileUpload);
router.post("/savedata", SaveDataController.saveData); // Add the new endpoint

export default router;
