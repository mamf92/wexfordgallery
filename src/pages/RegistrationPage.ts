import { register } from '../api/authService';
import { renderRegistrationForm } from '../components/forms/RegistrationForm';
import { showModal } from '../components/ui/Modals';
import { ApiClientError } from '../api/apiClient';

const BASE = import.meta.env.BASE_URL;

/**
 * Creates the registration page container with form.
 */
export function renderRegistrationPage() {
  const registerViewContainer = document.createElement('section');
  registerViewContainer.className =
    'flex flex-col items-center justify-center w-full bg-aurora-silk';
  registerViewContainer.appendChild(
    renderRegistrationForm(handleRegistrationFormSubmit)
  );
  return registerViewContainer;
}

/**
 * Handles registration form submission.
 * Normalizes the username, calls the API, and redirects on success.
 */
export async function handleRegistrationFormSubmit(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const unformattedName = formData.get('name') as string;
  const name = unformattedName
    .trim()
    .replace(/\s+/g, '_')
    .replace(/'/g, '')
    .replace(/'/g, '');
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await register({ name, email, password });
    if (response && response.data) {
      showModal({
        title: 'Registration successful!',
        message: 'You can now log in with your new account.',
        icon: 'success',
      });
      setTimeout(() => {
        window.location.href = BASE + 'login';
      }, 2000);
    }
  } catch (error) {
    let errorMessage = 'An unknown error occurred.';

    if (error instanceof ApiClientError) {
      errorMessage = error.apiError.errors?.[0]?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    showModal({
      title: 'Registration Error',
      message: errorMessage,
      icon: 'error',
    });
  }
}
