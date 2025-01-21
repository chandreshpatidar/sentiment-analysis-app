/** @format */

import { UserEntity } from "@/entities";
import { SentimentType } from "./sentiment.type";

export type CreateFeedbackRequestType = {
  text: string;
  user: UserEntity;
};

export type FeedbackResponseType = {
  text: string;
  score: number;
  magnitude: number;
  sentiment: SentimentType;
  user_id: string;
  createdAt: string;
  id: string;
};
