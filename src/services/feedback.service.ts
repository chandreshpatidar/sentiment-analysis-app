/** @format */

import { AppDataSource } from "@/setup/datasource";
import { FeedbackEntity } from "@/entities";
import { sentimentService } from "@/services";
import {
  CreateFeedbackRequestType,
  PaginatedFeedbackResponseType,
} from "@/types";

export const createFeedback = async ({
  text,
  user,
}: CreateFeedbackRequestType): Promise<FeedbackEntity | null> => {
  const feedbackRepository = AppDataSource.getRepository(FeedbackEntity);

  const { score, sentiment, magnitude } =
    await sentimentService.analyzeSentiment(text);

  const entity = feedbackRepository.create({
    text,
    score,
    magnitude,
    sentiment,
    user: user,
  });

  const feedback = await feedbackRepository.save(entity);

  return feedback;
};

export const getFeedback = async ({
  cursor,
  limit,
}): Promise<PaginatedFeedbackResponseType> => {
  const feedbackRepository = AppDataSource.getRepository(FeedbackEntity);

  const queryBuilder = feedbackRepository
    .createQueryBuilder("feedback")
    .leftJoinAndSelect("feedback.user", "user")
    .select([
      "feedback.uuid",
      "feedback.text",
      "feedback.score",
      "feedback.magnitude",
      "feedback.sentiment",
      "feedback.createdAt",
      "user.uuid",
    ])
    .orderBy("feedback.createdAt", "DESC")
    .take(limit + 1);

  if (cursor) {
    queryBuilder.where("feedback.createdAt < :cursor", {
      cursor: new Date(cursor as string),
    });
  }

  const feedbacks = await queryBuilder.getMany();

  const hasNextPage = feedbacks.length > limit;

  if (hasNextPage) {
    feedbacks.pop(); // Remove the extra record if it exists.
  }

  return {
    data: feedbacks.map((feedback) => ({
      id: feedback.uuid,
      text: feedback.text,
      score: feedback.score,
      magnitude: feedback.magnitude,
      sentiment: feedback.sentiment,
      createdAt: feedback.createdAt.toString(),
      user_id: feedback.user.uuid,
    })),
    hasNextPage,
    nextCursor: hasNextPage
      ? feedbacks[feedbacks.length - 1].createdAt.toString()
      : null,
  };
};
