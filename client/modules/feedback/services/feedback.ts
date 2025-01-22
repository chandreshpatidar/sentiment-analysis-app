import cookie from 'js-cookie';
import { ACCESS_TOKEN_KEY, API_BASE_URL } from '@/config';
import { toaster } from '@/components/ui/toaster';

export const addFeedback = async (feedback: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie.get(ACCESS_TOKEN_KEY)}`,
      },
      body: JSON.stringify({ text: feedback }),
    });
    const parsedRes = await res.json();

    if (res.ok) {
      toaster.create({ type: "success", title: "Feedback submitted successfully" });
      return parsedRes;
    }

    toaster.create({ type: "error", title: "Error in submitting feedback" });

    return {
      error: true,
      message: parsedRes?.error,
    };
  } catch (error) {
    console.error(`Error in adding feedback: ${error}`);
    toaster.create({ type: "error", title: "Error in submitting feedback" });

    return null;
  }
};
