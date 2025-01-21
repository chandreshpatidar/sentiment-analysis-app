/** @format */

export type SentimentType = "Good" | "Bad" | "Neutral";

export type CalculatedSentimentType = {
  score: number;
  magnitude: number;
  sentiment: SentimentType;
};
