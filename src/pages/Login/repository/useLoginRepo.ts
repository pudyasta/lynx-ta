import { POST_METHOD } from '@/constant/api';
import { AUTH_LOGIN_ENDPOINT } from '@/repository/auth/constant';
import { useApiClient } from '@/lib/api/core';
import type { LoginRequest } from '@/repository/auth/type';

export const useLoginRepo = () => {
  const api = useApiClient();

  const login = (data: LoginRequest) => {
    return api(AUTH_LOGIN_ENDPOINT, {
      method: POST_METHOD,
      data,
      timeout: 5000,
    });
  };

  return { login };
};
