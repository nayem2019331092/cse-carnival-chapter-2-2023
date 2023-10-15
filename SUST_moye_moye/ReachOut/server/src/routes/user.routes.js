import express from "express";
import { getLoginStatus, getProfile, getUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/profile", getProfile);
userRouter.get("/login-status", getLoginStatus);
userRouter.post("/getuser", getUser);

export default userRouter;
