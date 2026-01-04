import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { API_BASE_URL } from '../_config/API';
import { useAuth } from '../context/AuthProvider';
import { authRepo } from './auth/auth';
import { useNavigate } from 'react-router';

const instance = axios.create({
  baseURL: API_BASE_URL,
  // timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar', 'Content-Type': 'application/json' },
});

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
    const navigate = useNavigate();
    navigate('/login');
    return null;
  }

  // -------- If 401 & refresh token not null → refresh token
  const newToken = await authRepo.refreshToken(accessToken.refresh_token);
  if (!newToken?.data?.access_token) {
    const navigate = useNavigate();
    navigate('/login');
    return null;
  }

  // -------- Update access token
  setAccessToken({
    access_token: newToken.data.access_token,
    refresh_token: accessToken.refresh_token,
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
