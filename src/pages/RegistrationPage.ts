// import { renderRegistrationForm } from '../components/forms/RegistrationForm';

export function renderRegistrationPage() {
  const registerViewContainer = document.createElement('section');
  registerViewContainer.className =
    'flex flex-col items-center justify-center w-full';
  const heading = document.createElement('h1');
  heading.className = 'font-hero text-4xl text-wexham-light mb-6';
  heading.textContent = 'Create Your Wexford Gallery Account';
  registerViewContainer.appendChild(heading);
  // registerViewContainer.appendChild(renderRegistrationForm());
  return registerViewContainer;
}
