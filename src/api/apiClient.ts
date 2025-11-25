const BASE_URL = 'https://v2.api.noroff.dev';

/**
 * Options for configuring API requests.
 */
interface ApiOptions {
  /**
   * Optional request body data.
   */
  body?: unknown;
  /**
   * HTTP method for the request. Defaults to 'GET' or 'POST' based on presence of body.
   */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /**
   * Optional custom headers for the request.
   */
  headers?: Record<string, string>;
  /**
   * Indicates if the request requires authentication.
   * Defaults to true.
   */
  requiresAuth?: boolean;
}

export interface ApiError {
  errors?: {
    code?: string;
    message: string;
    path?: string[];
  }[];
  status?: string;
  statusCode?: number;
}

/**
 * Custom error class for API client errors.
 * Extends the built-in Error class to include API error details and status code.
 * Helps in handling and debugging API-related issues and displaying user-friendly messages.
 */

export class ApiClientError extends Error {
  public apiError: ApiError;
  public statusCode: number;

  constructor(apiError: ApiError, statusCode: number) {
    super(apiError.errors?.[0]?.message || 'API Client Error occurred');
    this.name = 'ApiClientError';
    this.apiError = apiError;
    this.statusCode = statusCode;
  }
}

/**
 * Generic API client for making HTTP requests to the Noroff API.
 */

async function apiClient<T = unknown>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T | null> {
  const { body, requiresAuth = true, ...customOptions } = options;

  const headers: Record<string, string> = {};

  if (requiresAuth && typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const apiKey = import.meta.env.VITE_NOROFF_API_KEY;
  if (apiKey) {
    headers['X-Noroff-API-Key'] = apiKey;
  }

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  if (customOptions.headers) {
    Object.assign(headers, customOptions.headers);
  }

  const config: RequestInit = {
    method: customOptions.method || (body ? 'POST' : 'GET'),
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(BASE_URL + endpoint, config);

    // Handles non-OK responses either by parsing the error body or creating a generic error
    if (!response.ok) {
      let errorData: ApiError;
      try {
        errorData = await response.json();
      } catch {
        errorData = {
          statusCode: response.status,
          status: response.statusText,
          errors: [{ message: 'Failed to parse error response' }],
        };
      }
      throw new ApiClientError(errorData, response.status);
    }

    // If no content, return null
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }
    console.error('API Client Error:', error);
    throw error;
  }
}

/**
 * Send a GET request.
 */

export const get = <T = unknown>(endpoint: string, requiresAuth = true) =>
  apiClient<T>(endpoint, { requiresAuth });

/**
 * Send a POST request.
 * example:
 */
export const post = <T = unknown>(
  endpoint: string,
  body: unknown,
  requiresAuth = true
) => apiClient<T>(endpoint, { body, method: 'POST', requiresAuth });

/**
 * Send a PUT request.
 */
export const put = <T = unknown>(
  endpoint: string,
  body?: unknown,
  requiresAuth = true
) => apiClient<T>(endpoint, { method: 'PUT', body, requiresAuth });

/**
 * Send a DELETE request.
 */
export const del = <T = unknown>(endpoint: string, requiresAuth = true) =>
  apiClient<T>(endpoint, { method: 'DELETE', requiresAuth });
