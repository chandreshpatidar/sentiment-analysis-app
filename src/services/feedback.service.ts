/** @format */

import { AppDataSource } from "@/setup/datasource";
import { FeedbackEntity } from "@/entities";
import { sentimentService } from "@/services";
import { CreateFeedbackRequestType } from "@/types";

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
