import express from "express";
import {
  getPosts,
} from "../controllers/community.controller.js";

const communityRouter = express.Router();

communityRouter.post("/community", getPosts);

export default communityRouter;
