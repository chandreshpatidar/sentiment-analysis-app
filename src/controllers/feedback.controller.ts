/** @format */

import { feedbackService } from "@/services";
import { Response } from "express";
import { errorHandlerWrapper } from "@/utils";
import { AuthenticatedRequest, FeedbackResponseType } from "@/types";

const postFeedbackHandler = async (req: AuthenticatedRequest, res: Response): Promise<FeedbackResponseType> => {
  const { text } = req.body;
  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "Text is required" });
    return;
  }

  if (text.trim().length > 1000) {
    res.status(400).json({ error: "Text is too long, allowed limit is 1000 characters" });
    return;
  }

  try {
    const feedback = await feedbackService.createFeedback({
      text: text.trim(),
      user: req.user,
    });
    res.status(200).json({
      text: feedback.text,
      score: feedback.score,
      magnitude: feedback.magnitude,
      sentiment: feedback.sentiment,
      user_id: feedback.user.uuid,
      createdAt: feedback.createdAt,
      id: feedback.uuid,
    });
  } catch (err: any) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
    return;
  }
};

const getFeedbackHandler = async (req: AuthenticatedRequest, res: Response) => {
  const { user } = req;
  const limit = req.query.limit || 10;
  const cursor = req.query.cursor && req.query.cursor !== "null" ? req.query.cursor : null;

  if (user.role !== "admin") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const queryLimit = parseInt(limit as string, 10);
  const feedbacks = await feedbackService.getFeedback({
    cursor: cursor as string,
    limit: queryLimit,
  });

  res.status(200).json(feedbacks);
};

export const postFeedback = errorHandlerWrapper(postFeedbackHandler);
export const getFeedback = errorHandlerWrapper(getFeedbackHandler);
