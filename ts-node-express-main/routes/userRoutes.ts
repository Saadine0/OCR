import express, { Router, Request, Response  } from "express";

import userController from "../controllers/userController";
const router: Router = express.Router();

router.get("/users", userController.getUsers);
router.post("/users", userController.addUser);

router.use("/profile", express.static("upload/images"));
router.post("/upload", userController.upload.single("profile"), userController.handleFileUpload);



export default router;
