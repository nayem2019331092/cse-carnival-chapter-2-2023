import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/all.routes.js";
import { handleError } from "./middlewares/errorHandler.js";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config();
const app = express();

// Middlewares
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/", router);
app.use(handleError);

export default app;
