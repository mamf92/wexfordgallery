import { TextInput } from '../inputs/InputField';
import { Button } from '../ui/Buttons';

export function renderEmailListForm(onSubmit: (e: SubmitEvent) => void) {
  const formContainer = document.createElement('div');
  formContainer.className = 'flex flex-col w-full bg-wexham-white';

  const form = document.createElement('form');
  form.id = 'email-list-form';
  form.className = 'flex flex-col gap-2 w-full items-start';
  form.addEventListener('submit', onSubmit);

  const emailInput = TextInput({
    id: 'email',
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email address',
    pattern: '^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.%+\\-]+\\.[a-zA-Z]{2,}$',
    required: true,
    title: 'Please enter a valid email address.',
    srOnly: true,
  });

  const submitButton = Button({
    label: 'Subscribe',
    variant: 'primary',
    size: 'small',
  });

  form.appendChild(emailInput);
  form.appendChild(submitButton);
  formContainer.appendChild(form);
  return formContainer;
}
