import cookie from 'js-cookie';
import { ACCESS_TOKEN_KEY, API_BASE_URL } from '@/config';

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
      return parsedRes;
    }

    return {
      error: true,
      message: parsedRes?.error,
    };
  } catch (error) {
    console.error(`Error in adding feedback: ${error}`);
    return null;
  }
};
