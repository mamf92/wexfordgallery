import { renderLoginForm } from '../components/forms/LoginForm';
import { login } from '../api/authService';
import { setAuthState } from '../auth/authState';
import { showModal } from '../components/ui/Modals';
import { ApiClientError } from '../api/apiClient';

const BASE = import.meta.env.BASE_URL;

export function renderLoginPage() {
  const loginViewContainer = document.createElement('div');
  loginViewContainer.className =
    'flex flex-col items-center justify-center w-full bg-aurora-silk';
  loginViewContainer.appendChild(renderLoginForm(handleLoginFormSubmit));
  return loginViewContainer;
}

/**
 * Handles the login form submission
 * @param event - The submit event
 */
export async function handleLoginFormSubmit(event: SubmitEvent) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await login({ email: email, password: password });
    if (response && response.data && response.data.accessToken) {
      setAuthState(response.data);
      window.location.href = BASE;
    }
  } catch (error) {
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof ApiClientError) {
      errorMessage = error.apiError.errors?.[0]?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    showModal({
      title: 'Login failed.',
      message: errorMessage,
      icon: 'error',
    });
  }
}
