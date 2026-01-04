import axios from 'axios';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../../model/auth';
import {
  AUTH_LOGIN_ENDPOINT,
  AUTH_LOGOUT_ENDPOINT,
  AUTH_REFRESH_ENDPOINT,
  AUTH_REGISTER_ENDPOINT,
  POST_METHOD,
} from '../../constant/constantAPI';
import { authAPIClient, guestAPIClient } from '../core';

class AuthRepo {
  async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await guestAPIClient(AUTH_LOGIN_ENDPOINT, {
      method: POST_METHOD,
      data: request,
      timeout: 0,
    });
    return response.data;
  }

  async register(request: RegisterRequest): Promise<AuthResponse> {
    const response = await guestAPIClient(AUTH_REGISTER_ENDPOINT, {
      method: POST_METHOD,
      data: request,
      timeout: 0,
    });
    return response.data;
  }

  // async logout(): Promise<void> {
  //   await authAPIClient.post(AUTH_LOGOUT_ENDPOINT);
  // }

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
