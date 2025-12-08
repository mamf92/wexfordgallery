type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

type IconVariants = 'filter' | 'search' | 'sort';

interface ButtonBaseProps {
  label: string;
  variant: ButtonVariant;
  size?: ButtonSize;
  id?: string;
  iconRight?: IconVariants;
  iconLeft?: IconVariants;
  onlyIcon?: IconVariants;
}

interface ButtonProps extends ButtonBaseProps {
  onClick?: (event: MouseEvent) => void;
}

interface LinkButtonProps extends ButtonBaseProps {
  href: string;
}

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
  iconRight,
  iconLeft,
  onlyIcon,
  onClick,
}: ButtonProps): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = buttonClassNames(size, variant);
  btn.tabIndex = 0;
  if (id) btn.id = id;
  btn.textContent = label;
  if (iconRight) {
    btn.innerHTML = btn.textContent + ICONS[iconRight];
  }
  if (iconLeft) {
    btn.innerHTML = ICONS[iconLeft] + btn.textContent;
  }
  if (onlyIcon) {
    btn.textContent = '';
    btn.innerHTML = ICONS[onlyIcon];
    console.log(btn.innerHTML);
    btn.ariaLabel = label;
  }
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

const BASE = 'inline-flex font-heading hover:cursor-pointer gap-2 text-center';

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

const ICONS: Record<IconVariants, string> = {
  filter:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="h-6 w-6" fill="#011526"><path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"/></svg>',
  search:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="h-6 w-6" fill="#011526"> <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/> </svg>',
  sort: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="h-6 w-6" fill="#011526"> <path d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z"/> </svg>',
};
