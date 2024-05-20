import express, { Router} from "express";
import FactureController from "../controllers/FactureController";
import Controller from "../controllers/Controller";
import CarteVisiteController from "../controllers/CarteVisiteController";
const router: Router = express.Router();

router.use("/profile", express.static("upload/images"));
router.post("/Facture", FactureController.upload.single("facture"), FactureController.handleFileUpload);
router.post("/carteVisite", CarteVisiteController.upload.single("carteVisite"), CarteVisiteController.handleFileUpload);
router.post("/upload", Controller.upload.single("profile"), Controller.handleFileUpload);



export default router;