// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";
const bodyParser = require("body-parser");
import userRoutes from "../routes/userRoutes";
const cors = require('cors');


/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app: Express = express();
const port = process.env.PORT || 3000;


/* Define a route for the root path ("/")
 using the HTTP GET method */

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", userRoutes);

/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
