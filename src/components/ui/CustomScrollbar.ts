/**
 * Tailwind utility classes for styling webkit scrollbars.
 * Apply to elements with overflow to get a custom scrollbar appearance.
 *
 * @example
 * ```ts
 * const container = document.createElement('div');
 * container.className = `overflow-y-auto ${customScrollbar}`;
 * ```
 */
export const customScrollbar = [
  // Basic sizing - thin but not too thin
  '[&::-webkit-scrollbar]:w-2',
  '[&::-webkit-scrollbar]:h-2',

  // The draggable thumb
  '[&::-webkit-scrollbar-thumb]:bg-wexham-blue',
  '[&::-webkit-scrollbar-thumb]:rounded-md',

  // Smooth interactions feel professional
  '[&::-webkit-scrollbar-thumb]:transition-colors',
  '[&::-webkit-scrollbar-thumb]:duration-200',
  '[&::-webkit-scrollbar-thumb:hover]:bg-gray-400',

  // Clean track and hidden buttons
  '[&::-webkit-scrollbar-track]:bg-transparent',
  '[&::-webkit-scrollbar-button]:hidden',
].join(' ');
