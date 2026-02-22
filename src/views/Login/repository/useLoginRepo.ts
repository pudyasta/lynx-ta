import { POST_METHOD } from '@/constant/api';
import { useApiClient } from '@/lib/api/core';
import { AUTH_LOGIN_ENDPOINT } from '@/repository/auth/constant';
import type { AuthResponse, LoginRequest } from '@/repository/auth/type';

export const useLoginRepo = (data: LoginRequest) => {
  const api = useApiClient();
  return {
    login: api(AUTH_LOGIN_ENDPOINT, {
      method: POST_METHOD,
      data,
      timeout: 5000,
    }),
  };
};
