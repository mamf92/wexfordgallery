import { post } from './apiClient';
import type { Media } from './listingsService';
import { setAuthState } from '../auth/authState';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface BaseUser {
  name: string;
  email: string;
  bio: string | null;
  avatar: Media;
  banner: Media;
}
interface LoginUser extends BaseUser {
  accessToken: string;
}

interface LoginResponse {
  data: LoginUser;
  meta: Record<string, unknown>;
}

interface RegisterResponse {
  data: BaseUser;
  meta: Record<string, unknown>;
}

export async function register(data: RegisterData): Promise<RegisterResponse> {
  const response = await post<RegisterResponse>('/auth/register', data, false);
  if (!response)
    throw new Error('Error registering user: No response data received.');
  return response;
}

/**
 * Logs in a user with provided credentials and updates the authentication state.
 */

export async function login(data: LoginData): Promise<LoginResponse> {
  const response = await post<LoginResponse>('/auth/login', data, false);

  if (!response) {
    throw new Error('Error signing in: No response data received.');
  }

  setAuthState({
    accessToken: response.data.accessToken,
    name: response.data.name,
  });
  return response;
}
