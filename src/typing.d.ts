import type { Theme } from '@/constant/style';

declare let NativeModules: {
  NativeLocalStorageModule: {
    setToken(token: Token | null): void;
    getToken(): Token | null;
    getUser(): User | null;
    setUser(user: User | null): void;

    setTheme(theme: Theme): void;
    getTheme(): Theme;

    setStorageItem(key: string, value: string): void;
    getStorageItem(key: string, callback: (value: string) => void): void;
    clearStorage(): void;
  };
};
