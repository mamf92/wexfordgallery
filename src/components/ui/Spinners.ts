type SpinnerSize = 'small' | 'medium' | 'large' | 'xlarge';

const SPINNER_SIZE_CLASSES: Record<SpinnerSize, string> = {
  small: 'loader--sm',
  medium: '',
  large: 'loader--lg',
  xlarge: 'loader--xl',
};

/**
 * Creates a full-page loading overlay with a spinner.
 * Returns the container element for later removal.
 */
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

/**
 * Removes a page spinner overlay from the DOM.
 */
export function hidePageSpinner(container: HTMLElement | null) {
  container?.remove();
}

/**
 * Creates an inline spinner element that can be inserted into other components.
 */
export function showInlineSpinner(size: SpinnerSize): HTMLDivElement {
  const spinner = document.createElement('div');
  spinner.className = `inline-block loader ${SPINNER_SIZE_CLASSES[size]} align-middle`;
  return spinner;
}

/**
 * Removes an inline spinner from the DOM.
 */
export function hideInlineSpinner(spinner: HTMLDivElement | null) {
  spinner?.remove();
}
