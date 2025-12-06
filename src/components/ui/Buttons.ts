type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonBaseProps {
  label: string;
  variant: ButtonVariant;
  size?: ButtonSize;
  id?: string;
}

interface ButtonProps extends ButtonBaseProps {
  onClick?: (event: MouseEvent) => void;
}

interface LinkButtonProps extends ButtonBaseProps {
  href: string;
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  xsmall: 'text-xs py-1 px-3',
  small: 'text-md py-1 px-5',
  medium: 'text-lg py-1 px-5 m-t-1 m-b-3',
  large: 'text-lg py-3 px-6 m-t-1 m-b-3',
};

const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'border-wexham-dark text-wexham-dark border-t-1 border-b-1 md:border-t-2 md:border-b-2 hover:border-wexham-blue hover:text-wexham-blue',
  secondary:
    'border-wexham-dark text-wexham-dark border-b-1 md:border-b-2 hover:border-wexham-blue hover:text-wexham-blue',
  tertiary: 'border-wexham-dark hover:text-wexham-blue',
};

const BASE = 'inline-flex font-heading hover:cursor-pointer gap-2 text-center';

export function buttonClassNames(
  size: ButtonSize = 'medium',
  variant: ButtonVariant = 'primary'
): string {
  return `${BASE} ${BUTTON_VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]}`;
}

export function Button({
  label,
  variant = 'primary',
  size = 'medium',
  id,
  onClick,
}: ButtonProps): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = buttonClassNames(size, variant);
  btn.tabIndex = 0;
  if (id) btn.id = id;
  btn.textContent = label;
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
}

export function LinkButton({
  label,
  size = 'medium',
  id,
  variant = 'primary',
  href,
}: LinkButtonProps): HTMLAnchorElement {
  const link = document.createElement('a');
  link.className = buttonClassNames(size, variant);
  if (id) link.id = id;
  link.textContent = label;
  link.href = href;
  link.tabIndex = 0;

  return link;
}
