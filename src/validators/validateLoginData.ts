import type { LoginData } from '../api/authService';

/**
 * Validation error details for authentication forms
 */
interface AuthValidationError {
  field?: 'name' | 'email' | 'password';
  message: string;
}

/**
 * Validates login credentials against Noroff email and password requirements
 *
 * @returns Error details if validation fails, null if valid
 */
export function validateLoginData(data: LoginData): AuthValidationError | null {
  if (!data.email || !data.password) {
    return {
      message:
        'All fields are required. Please fill in all fields and try again.',
    };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  const passwordRegex = /^[a-zA-Z0-9._%+-]{8,}$/;

  if (!emailRegex.test(data.email)) {
    return {
      field: 'email',
      message:
        'Email must be a valid email address ending with @stud.noroff.no',
    };
  }
  if (!passwordRegex.test(data.password)) {
    return {
      field: 'password',
      message:
        'Password must be at least 8 characters long and can only contain letters, numbers, and special characters.',
    };
  }
  return null;
}
