import type { Token, User } from '../model/auth';
import type { Theme } from './style';

export async function saveToken(token: Token | null) {
  return NativeModules.NativeLocalStorageModule.setToken(token);
}
export async function loadToken(): Promise<Token | null> {
  return NativeModules.NativeLocalStorageModule.getToken();
}
export async function saveUser(user: User | null) {
  return NativeModules.NativeLocalStorageModule.setUser(user);
}
export async function loadUser(): Promise<User | null> {
  return NativeModules.NativeLocalStorageModule.getUser();
}

export async function loadTheme(): Promise<Theme> {
  return NativeModules.NativeLocalStorageModule.getTheme();
}

export async function saveTheme(theme: Theme) {
  return NativeModules.NativeLocalStorageModule.setTheme(theme);
}
