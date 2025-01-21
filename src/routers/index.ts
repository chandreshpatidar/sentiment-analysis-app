/** @format */

import express from "express";
import { authMiddleware } from "@/middlewares";
import { authRouter } from "./auth.router";
import { feedbackRouter } from "./feedback.router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/feedback", authMiddleware, feedbackRouter);

export default router;
