import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { useAuth } from '@/context/AuthProvider';
import { useNavigate } from 'react-router';
import { API_BASE_URL, POST_METHOD } from '@/constant/api';
import type { AuthResponse } from '@/repository/auth/type';
import { AUTH_REFRESH_ENDPOINT } from '@/repository/auth/constant';

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'X-Custom-Header': 'foobar', 'Content-Type': 'application/json' },
});

export const refreshTokenApi = async (
  refreshToken: string,
): Promise<AuthResponse> => {
  const response = await guestAPIClient(AUTH_REFRESH_ENDPOINT, {
    method: POST_METHOD,
    data: { refresh_token: refreshToken },
    timeout: 0,
  });
  return response.data;
};

export const guestAPIClient = (
  url: string,
  config: AxiosRequestConfig = {},
) => {
  return instance.request({
    url,
    ...config,
    validateStatus: () => true,
  });
};

export const authAPIClient = async (
  url: string,
  config: AxiosRequestConfig = {},
) => {
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();

  const headers = {
    ...(config.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  // -------- 1st try (normal request)
  let res = await instance.request({
    url,
    ...config,
    headers,
    validateStatus: () => true, // prevent axios from throwing on 401
  });

  if (res.status !== 401) return res;

  /**
  |--------------------------------------------------
  | AUTO LOGIN 
  |--------------------------------------------------
  */
  // -------- If 401 & refresh token null → redirect to login
  if (!accessToken?.refresh_token) {
    navigate('/login');
    return null;
  }

  // -------- If 401 & refresh token not null → refresh token
  const newToken = await refreshTokenApi(accessToken.refresh_token);
  if (!newToken?.data?.access_token) {
    navigate('/login');
    return null;
  }

  // -------- Update access token
  setAccessToken({
    access_token: newToken.data.access_token,
    refresh_token: accessToken.refresh_token,
    expires_in: newToken.data.expires_in,
  });

  /**
  |--------------------------------------------------
  | Retry with new token
  |--------------------------------------------------
  */
  res = await instance.request({
    url,
    ...config,
    headers: {
      ...(config.headers || {}),
      Authorization: `Bearer ${newToken.data.access_token}`,
    },
    validateStatus: () => true,
  });

  return res;
};

export const useApiClient = () => {
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();

  const api = async (url: string, config: AxiosRequestConfig = {}) => {
    const headers = {
      ...(config.headers || {}),
      ...(accessToken?.access_token
        ? { Authorization: `Bearer ${accessToken.access_token}` }
        : {}),
    };

    // -------- 1st try (normal request)
    let res = await instance.request({
      url,
      ...config,
      headers,
      validateStatus: () => true,
    });

    // -------- If 401 & refresh token null → redirect to login
    if (res.status !== 401) return res;

    // -------- Handle 401: If no refresh token, we can't proceed this request
    if (!accessToken?.refresh_token) {
      // navigate('/login');
      return res;
    }

    /**
    |--------------------------------------------------
    | AUTO LOGIN 
    |--------------------------------------------------
    */
    try {
      const newToken = await refreshTokenApi(accessToken.refresh_token);

      if (!newToken?.data?.access_token) {
        throw new Error('Refresh failed');
      }

      // -------- Update access token
      setAccessToken({
        ...accessToken,
        access_token: newToken.data.access_token,
      });

      // -------- Final Retry with the brand-new token
      return await instance.request({
        url,
        ...config,
        headers: {
          ...(config.headers || {}),
          Authorization: `Bearer ${newToken.data.access_token}`,
        },
        validateStatus: () => true,
      });
    } catch (err) {
      // If refresh fails, the session is dead. Log out the user.
      setAccessToken(null);
      navigate('/login');
      return res;
    }
  };

  return api;
};
