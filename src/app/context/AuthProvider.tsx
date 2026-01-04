// import React, { createContext, useContext, useState } from 'react';
// import type { Token, User } from '../entity/auth';
// import { useEffect } from '@lynx-js/react';
// type AuthContextType = {
//   accessToken: Token | null;
//   setAccessToken: (t: Token | null) => void;
//   user: User | null;
//   setUser: (u: User | null) => void;
// };
// const AuthContext = createContext<AuthContextType | null>(null);
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [accessToken, setAccessToken] = useState<Token | null>(() => {
//     const stored = localStorage.getItem('accessToken');
//     return stored ? JSON.parse(stored) : null;
//   });

//   const [user, setUser] = useState<User | null>(() => {
//     const stored = localStorage.getItem('user');
//     return stored ? JSON.parse(stored) : null;
//   });

//   // Sync token to localStorage
//   useEffect(() => {
//     if (accessToken) {
//       localStorage.setItem('accessToken', JSON.stringify(accessToken));
//     } else {
//       localStorage.removeItem('accessToken');
//     }
//   }, [accessToken]);

//   // Sync user to localStorage
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('user');
//     }
//   }, [user]);

//   return (
//     <AuthContext.Provider
//       value={{ accessToken, setAccessToken, user, setUser }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useContext, useEffect, useState } from 'react';
import type { Token, User } from '../model/auth';
import {
  loadToken,
  loadUser,
  saveToken,
  saveUser,
} from '../constant/localStorage';

// auth.tsx
type AuthContextType = {
  accessToken: Token | null;
  setAccessToken: (t: Token | null) => void;
  user: User | null;
  setUser: (u: User | null) => void;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, _setAccessToken] = useState<Token | null>(null);
  const [user, _setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const existing = await loadToken();
        const user = await loadUser();
        _setUser(user);
        _setAccessToken(existing);
        setHydrated(true);
        console.log(existing);
      } catch (err) {
        console.log(err);
        setHydrated(true);
      }
    })();
    console.log('ok');
  }, []);

  const setAccessToken = (token: Token | null) => {
    _setAccessToken(token);
    saveToken(token);
  };

  const setUser = (user: User | null) => {
    _setUser(user);
    saveUser(user);
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, user, setUser, logout }}
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
