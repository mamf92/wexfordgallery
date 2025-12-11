import type { RegisterData } from '../api/authService';

/**
 * Describes a validation error with an optional field reference
 */
interface AuthValidationError {
  field?: 'name' | 'email' | 'password';
  message: string;
}

/**
 * Validates registration data against Noroff requirements:
 * - Name: min 3 chars, letters/underscores only
 * - Email: must end with @stud.noroff.no
 * - Password: min 8 chars, letters/numbers/special chars
 *
 * @returns null if valid, or an error object with field reference and message
 */
export function validateRegisterData(
  data: RegisterData
): AuthValidationError | null {
  if (!data.name || !data.email || !data.password) {
    return {
      message:
        'All fields are required. Please fill in all fields and try again.',
    };
  }

  const nameRegex = /^[a-zA-ZÀ-ÿ_]{3,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  const passwordRegex = /^[a-zA-ZÀ-ÿ0-9#?!@$%^&*-]{8,}$/;

  if (!nameRegex.test(data.name)) {
    return {
      field: 'name',
      message:
        'Name must be at least 3 characters long and can only contain letters and underscores.',
    };
  }

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
