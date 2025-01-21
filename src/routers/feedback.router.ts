/** @format */

import { feedbackController } from "@/controllers";
import { Router } from "express";

export const feedbackRouter = Router();

feedbackRouter.post("/", feedbackController.postFeedback);
feedbackRouter.get("/", feedbackController.getFeedback);
