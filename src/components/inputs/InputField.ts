interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'number' | 'password' | 'email' | 'url';
  placeholder?: string;
  value?: string;
  required?: boolean;
  pattern?: string;
  min?: string;
  max?: string;
  minLength?: number;
  maxLength?: number;
  title?: TitleVariants | string;
  autocomplete?: AutoFill;
  srOnly?: boolean;
}

type TitleVariants = 'PasswordTitle' | 'EmailTitle';

const TITLE_VARIANTS: Record<TitleVariants, string> = {
  PasswordTitle: 'Password must be at least 8 characters long',
  EmailTitle: 'Email must be a @stud.noroff.no address',
};

export function TextInput({
  id,
  name,
  label,
  type,
  placeholder,
  value,
  required,
  title,
  pattern,
  min,
  max,
  minLength,
  maxLength,
  autocomplete,
  srOnly,
}: InputFieldProps): HTMLElement {
  const container = document.createElement('div');
  container.className = 'flex flex-col w-full justify-start gap-2';

  const inputLabel = document.createElement('label');
  inputLabel.htmlFor = id;
  inputLabel.textContent = label;
  inputLabel.className = srOnly
    ? 'sr-only'
    : 'font-heading text-md font-semibold text-wexham-dark';

  const inputField = document.createElement('input');
  inputField.id = id;
  inputField.name = name;
  inputField.type = type ?? '';
  inputField.placeholder = placeholder ?? '';
  inputField.value = value ?? '';
  inputField.required = required ?? false;
  inputField.pattern = pattern ?? '';
  inputField.min = min ?? '';
  inputField.max = max ?? '';
  inputField.minLength = minLength ?? 0;
  inputField.maxLength = maxLength ?? 524288;
  inputField.title = title
    ? (TITLE_VARIANTS[title as TitleVariants] ?? (title as string))
    : '';
  inputField.autocomplete = autocomplete ?? 'on';
  inputField.className =
    'flex flex-row p-2 bg-wexham-white border-wexham-dark border-y-1 lg:border-y-2 justify-start items-center font-body text-sm focus:outline-none focus:shadow-focus';

  const helperText = document.createElement('span');
  helperText.className = 'text-xs font-body text-orange-800 hidden';

  let hasInteracted = false;

  const updateValidationStyles = () => {
    if (inputField.validity.valid) {
      inputField.dataset.state = 'valid';
      helperText.classList.add('hidden');
    } else {
      inputField.dataset.state = 'invalid';
      helperText.classList.remove('hidden');
      helperText.textContent = inputField.title;
    }
  };

  inputField.addEventListener('input', () => {
    hasInteracted = true;
    updateValidationStyles();
  });

  inputField.addEventListener('change', () => {
    hasInteracted = true;
    updateValidationStyles();
  });

  inputField.addEventListener('blur', () => {
    if (hasInteracted && !inputField.validity.valid) {
      helperText.classList.remove('hidden');
    }
  });

  container.appendChild(inputLabel);
  container.appendChild(inputField);
  container.appendChild(helperText);

  return container;
}
