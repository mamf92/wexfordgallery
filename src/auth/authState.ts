interface AuthStateParams {
  accessToken: string;
  name?: string;
}

const ACCESS_TOKEN_KEY = 'accessToken';
const USER_NAME_KEY = 'userName';

/**
 * Checks if user is logged in
 */

export function isAuthenticated(): boolean {
  return !!localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * Sets authentication state by storing access token and user name in local storage.
 */
export function setAuthState({ accessToken, name }: AuthStateParams): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (name) {
    localStorage.setItem(USER_NAME_KEY, name);
  }
}

export function getUserName(): string {
  return localStorage.getItem(USER_NAME_KEY) || '';
}

/**
 * Clears authentication state by removing access token and user name from local storage.
 */
export function clearAuthState(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_NAME_KEY);
}
