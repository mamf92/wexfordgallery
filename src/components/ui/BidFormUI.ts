import { Button } from './Buttons.ts';

const BASE = import.meta.env.VITE_BASE_URL;

/**
 * Creates a temporary bid flow UI with a button that triggers the bid handler
 * and navigates to the listing detail page.
 */
export function showBidFlow(
  listingId: string,
  handleBid: (id: string) => void
): HTMLElement {
  const bidFlowContainer = document.createElement('div');
  bidFlowContainer.className = 'flex justify-center w-full mt-2';

  const tempBidFlowButton = Button({
    label: 'Place Bid (Temp)',
    variant: 'primary',
    size: 'medium',
    onClick: () => {
      handleBid(listingId);
      window.location.href = BASE + `listing/${listingId}`;
    },
  });

  bidFlowContainer.appendChild(tempBidFlowButton);
  return bidFlowContainer;
}
