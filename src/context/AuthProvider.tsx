import { createContext, useContext, useEffect, useState } from 'react';
import type { Token, User } from '../repository/auth/type';
import {
  getPref,
  PrefKey,
  removePref,
  setPref,
} from '@/lib/helper/localStorage';
import { isTokenValid } from '@/lib/helper/isTokenValid';
import { useNavigate } from 'react-router';
import { refreshTokenApi } from '@/lib/api/core';

type AuthContextType = {
  accessToken: Token | null;
  setAccessToken: (t: Token | null) => void;
  user: User | null;
  setUser: (u: User | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const nav = useNavigate();

  const [accessToken, _setAccessToken] = useState<Token | null>(null);
  const [user, _setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const [isAuthenticated, _setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await getPref<Token>(PrefKey.Token);
        const user = await getPref<User>(PrefKey.User);

        if (token && token.access_token && user && isTokenValid(token)) {
          _setUser(user);
          _setAccessToken(token);
        } else {
          if (token?.refresh_token) {
            const newToken = await refreshTokenApi(token.refresh_token);
            if (newToken.data) {
              setAccessToken(newToken.data);
              _setUser(user);
            }
          }
        }

        setHydrated(true);
      } catch (err) {
        setHydrated(true);
      }
    })();
  }, []);

  const setAccessToken = (token: Token | null) => {
    if (!token) return;
    token.expires_in = token.expires_in + Math.floor(Date.now() / 1000);
    _setAccessToken(token);
    setPref(PrefKey.Token, token);
  };

  const setUser = (user: User | null) => {
    _setUser(user);
    setPref(PrefKey.User, user);
  };

  const logout = () => {
    _setAccessToken(null);
    _setUser(null);
    removePref();
  };

  useEffect(() => {
    _setIsAuthenticated(Boolean(accessToken && isTokenValid(accessToken)));
    if (!isAuthenticated) {
      nav('/login', { replace: true });
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        setUser,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
