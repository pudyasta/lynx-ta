// repository/auth/index.ts
import type { AuthResponse, LoginRequest, RegisterRequest } from './type';
import {
  AUTH_LOGIN_ENDPOINT,
  AUTH_REFRESH_ENDPOINT,
  AUTH_REGISTER_ENDPOINT,
} from './constant';
import { guestAPIClient } from '../../lib/api/core';
import { POST_METHOD } from '../../constant/api';

export const loginApi = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await guestAPIClient(AUTH_LOGIN_ENDPOINT, {
    method: POST_METHOD,
    data,
    timeout: 5000,
  });
  return response.data;
};

export const registerApi = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await guestAPIClient(AUTH_REGISTER_ENDPOINT, {
    method: POST_METHOD,
    data,
    timeout: 5000,
  });
  return response.data;
};

export const useLogin = () => {};
