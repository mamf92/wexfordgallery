import { TextInput } from '../inputs/InputField';
import { Button } from '../ui/Buttons';

const BASE = import.meta.env.BASE_URL;

export function renderLoginForm(onSubmit: (e: SubmitEvent) => void) {
  const formContainer = document.createElement('div');
  formContainer.className =
    'flex flex-col w-[90vw] bg-wexham-white my-6 p-4 py-5 lg:px-8 lg:py-6 border-y-1 lg:border-y-2 border-wexham-dark lg:max-w-[42.5rem] gap-4';

  const formTitle = document.createElement('h1');
  formTitle.innerText = 'Login';
  formTitle.className = 'text-2xl lg:text-3xl font-semibold font-heading';

  const formDescription = document.createElement('p');
  formDescription.innerHTML = `Do you have an account? Register <a href="${BASE}register" class="underline" tabindex="0">here</a>.`;
  formDescription.className = 'text-lg font-body';

  const form = document.createElement('form');
  form.id = 'login-form';
  form.className = 'flex flex-col gap-8 w-full items-center';
  form.addEventListener('submit', onSubmit);

  const emailInput = TextInput({
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your @stud.noroff.no email',
    pattern: '^[a-zA-Z0-9._%+\\-]+@stud\\.noroff\\.no$',
    required: true,
    title: 'EmailTitle',
  });
  emailInput.classList.add('w-full');

  const passwordInput = TextInput({
    id: 'password',
    name: 'password',
    label: 'Password',
    type: 'password',
    pattern: '^.{8,}$',
    placeholder: 'Enter your password',
    required: true,
    title: 'PasswordTitle',
  });
  passwordInput.classList.add('w-full');

  const submitButton = Button({
    label: 'Login',
    variant: 'primary',
    size: 'medium',
  });

  form.appendChild(emailInput);
  form.appendChild(passwordInput);
  form.appendChild(submitButton);
  formContainer.appendChild(formTitle);
  formContainer.appendChild(formDescription);
  formContainer.appendChild(form);
  return formContainer;
}
