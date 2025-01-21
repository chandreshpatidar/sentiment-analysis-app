/** @format */

import language from "@google-cloud/language";
import { CalculatedSentimentType, SentimentType } from "@/types";

const client = new language.LanguageServiceClient();

export async function analyzeSentiment(
  text: string
): Promise<CalculatedSentimentType> {
  try {
    const [result] = await client.analyzeSentiment({
      document: { content: text, type: "PLAIN_TEXT" },
    });

    const sentiment = result.documentSentiment;
    const score = sentiment.score;

    let sentimentType: SentimentType;

    if (score > 0.25) {
      sentimentType = "Good";
    } else if (score < -0.25) {
      sentimentType = "Bad";
    } else {
      sentimentType = "Neutral";
    }

    const calculatedSentiment = {
      score,
      magnitude: sentiment.magnitude,
      sentiment: sentimentType,
    };

    return calculatedSentiment;
  } catch (err) {
    console.error("ERROR:", err);
  }
}
