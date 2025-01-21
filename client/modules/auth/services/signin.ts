import { toaster } from '@/components/ui/toaster';
import { API_BASE_URL } from '@/config';

export const signIn = async (username: string, password: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username, password }),
    });
    const parsedRes = await res.json();

    if (res.ok) {
      return parsedRes;
    }

    return {
      error: true,
      message: parsedRes?.message,
    };
  } catch (error) {
    console.error(`Error signing in: ${error}`);
    toaster.create({ type: "error", title: "Failed to sign in" });
    return null;
  }
};
