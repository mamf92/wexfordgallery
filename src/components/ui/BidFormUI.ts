import { Button } from './Buttons.ts';

const BASE = import.meta.env.VITE_BASE_URL;

export function showBidFlow(listingId: string): HTMLElement {
  const bidFlowContainer = document.createElement('div');
  bidFlowContainer.className = 'flex justify-center w-full mt-2';
  const tempBidFlowButton = Button({
    label: 'Place Bid (Temp)',
    variant: 'primary',
    size: 'medium',
    onClick: () => {
      window.location.href = BASE + `listing/${listingId}`;
    },
  });
  bidFlowContainer.appendChild(tempBidFlowButton);
  return bidFlowContainer;
}
