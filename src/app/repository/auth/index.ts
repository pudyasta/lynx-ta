import type { AuthResponse, LoginRequest, RegisterRequest } from './type';
import {
  AUTH_LOGIN_ENDPOINT,
  AUTH_LOGOUT_ENDPOINT,
  AUTH_REFRESH_ENDPOINT,
  AUTH_REGISTER_ENDPOINT,
  POST_METHOD,
} from '../../constant/constantAPI';
import { guestAPIClient } from '../core';

class AuthRepo {
  async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await guestAPIClient(AUTH_LOGIN_ENDPOINT, {
      method: POST_METHOD,
      data: request,
      timeout: 5000,
    });
    return response.data;
  }

  async register(request: RegisterRequest): Promise<AuthResponse> {
    const response = await guestAPIClient(AUTH_REGISTER_ENDPOINT, {
      method: POST_METHOD,
      data: request,
      timeout: 5000,
    });
    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await guestAPIClient(AUTH_REFRESH_ENDPOINT, {
      method: POST_METHOD,
      data: {
        refresh_token: refreshToken,
      },
      timeout: 0,
    });
    return response.data;
  }
}

export const authRepo = new AuthRepo();
