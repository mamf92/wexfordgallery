import { TextInput } from '../inputs/InputField';
import { Button } from '../ui/Buttons';

const BASE = import.meta.env.BASE_URL;

export function renderRegistrationForm(onSubmit: (e: SubmitEvent) => void) {
  const formContainer = document.createElement('div');
  formContainer.className =
    'flex flex-col w-[90vw] bg-wexham-white my-6 p-4 py-5 lg:px-8 lg:py-6 border-y-1 lg:border-y-2 border-wexham-dark lg:max-w-[42.5rem] gap-4';

  const formTitle = document.createElement('h1');
  formTitle.innerText = 'Register account';
  formTitle.className = 'text-2xl lg:text-3xl font-semibold font-heading';

  const formDescription = document.createElement('p');
  formDescription.innerHTML = `Already have an account? Login <a href="${BASE}login" class="underline" tabindex="0">here</a>.`;
  formDescription.className = 'text-lg font-body';

  const form = document.createElement('form');
  form.id = 'register-form';
  form.className = 'flex flex-col gap-8 w-full items-center';
  form.addEventListener('submit', onSubmit);

  const nameInput = TextInput({
    id: 'name',
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter full name',
    pattern: `^[a-zA-ZÀ-ÿ\\-\\s'’]{3,}$`,
    required: true,
    title:
      'Enter your full name. Letters, spaces, hyphens, and apostrophes only.',
    autocomplete: 'name',
  });
  nameInput.classList.add('w-full');

  const emailInput = TextInput({
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your @stud.noroff.no email',
    pattern: '^[a-zA-Z0-9._%+\\-]+@stud\\.noroff\\.no$',
    required: true,
    title: 'EmailTitle',
    autocomplete: 'email',
  });
  emailInput.classList.add('w-full');

  const passwordInput = TextInput({
    id: 'password',
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    pattern: '^.{8,}$',
    required: true,
    title: 'PasswordTitle',
    autocomplete: 'new-password',
  });
  passwordInput.classList.add('w-full');

  const submitButton = Button({
    label: 'Register',
    variant: 'primary',
    size: 'medium',
  });

  form.appendChild(nameInput);
  form.appendChild(emailInput);
  form.appendChild(passwordInput);
  form.appendChild(submitButton);
  formContainer.appendChild(formTitle);
  formContainer.appendChild(formDescription);
  formContainer.appendChild(form);
  return formContainer;
}
