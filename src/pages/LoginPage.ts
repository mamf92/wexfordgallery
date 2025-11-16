// import { renderLoginForm } from '../components/forms/LoginForm';

export function renderLoginPage() {
  const loginViewContainer = document.createElement('div');
  loginViewContainer.className =
    'flex flex-col items-center justify-center w-full';
  const heading = document.createElement('h1');
  heading.className = 'font-heading text-4xl text-wexham-dark mb-6';
  heading.textContent = 'Login page';
  loginViewContainer.appendChild(heading);
  // loginViewContainer.appendChild(renderLoginForm());
  return loginViewContainer;
}
