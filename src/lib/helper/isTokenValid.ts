import type { Token } from '@/repository/auth/type';

export const isTokenValid = (token: Token | undefined): boolean => {
  if (!token) return false;
  try {
    const currentTime = Math.floor(Date.now() / 1000);
    return token.expires_in > currentTime;
  } catch (error) {
    console.log(error);
    return false;
  }
};
