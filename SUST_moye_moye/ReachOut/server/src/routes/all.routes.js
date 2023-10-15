import express from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import classroomRouter from "./classroom.routes.js";
import routineRouter from "./routine.route.js";
import calendarRouter from "./calendar.routes.js";
import communityRouter from "./community.routes.js";
import newRouter from "./newRouter.routes.js";
import qsRouter from "./qs.routes.js";

const router = express.Router();

router.use(authRouter);
router.use(userRouter);
router.use(classroomRouter);
router.use(routineRouter);
router.use(calendarRouter);
router.use(communityRouter);
router.use(newRouter);
router.use(qsRouter);

export default router;
