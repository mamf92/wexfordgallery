type SpinnerSize = 'small' | 'medium' | 'large' | 'xlarge';

const SPINNER_SIZE_CLASSES: Record<SpinnerSize, string> = {
  small: 'loader--sm',
  medium: '',
  large: 'loader--lg',
  xlarge: 'loader--xl',
};

export function showPageSpinner(
  size: SpinnerSize,
  parent?: HTMLElement
): HTMLElement {
  const container = document.createElement('div');
  container.className =
    'fixed inset-0 flex items-center justify-center bg-wexham-white/75 z-50';
  const spinner = document.createElement('div');
  spinner.className = `loader ${SPINNER_SIZE_CLASSES[size]}`;
  container.appendChild(spinner);
  (parent ?? document.body).appendChild(container);
  return container;
}

export function hidePageSpinner(container: HTMLElement | null) {
  container?.remove();
}

export function showInlineSpinner(size: SpinnerSize): HTMLDivElement {
  const spinner = document.createElement('div');
  spinner.className = `inline-block loader ${SPINNER_SIZE_CLASSES[size]} align-middle`;
  return spinner;
}

export function hideInlineSpinner(spinner: HTMLDivElement | null) {
  spinner?.remove();
}
