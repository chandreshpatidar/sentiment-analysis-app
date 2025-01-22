export type SentimentType = 'Good' | 'Bad' | 'Neutral';

export type FeedbackType = {
  text: string;
  score: number;
  magnitude: number;
  sentiment: SentimentType;
  user_id: string;
  createdAt: string;
  id: string;
};
