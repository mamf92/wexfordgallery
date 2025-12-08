import type { FullListing } from '../../api/listingsService';
import { renderSingleItemHero } from './SingleItemHero';
import { customScrollbar } from './CustomScrollbar';
import { Button } from './Buttons';

interface MultipleItemsOptions {
  listings: FullListing[];
  withDescription?: boolean;
}

export function renderMultiItemHero(
  options: MultipleItemsOptions
): HTMLElement | null {
  if (!options.listings || options.listings.length === 0) {
    console.error('No listing data provided to renderListingCard.');
    return null;
  }
  const multiItemSlider = document.createElement('div');
  multiItemSlider.className = `flex overflow-x-scroll snap-x snap-mandatory ${customScrollbar} border-wexham-dark border-b-1 w-full gap-2`;
  options.listings.forEach((item) => {
    const itemCard = renderSingleItemHero(item, {
      withDescription: options.withDescription,
    });
    itemCard?.classList.add('snap-center', 'flex-shrink-0', 'max-w-[90%]');
    if (itemCard) {
      multiItemSlider.appendChild(itemCard);
    }
  });
  const scrollButtons = document.createElement('div');
  scrollButtons.className =
    'flex max-lg:hidden gap-2 w-full justify-between absolute top-69 left-1/2 transform -translate-x-1/2';
  const leftButton = Button({
    label: '‹ Previous',
    variant: 'tertiary',
    size: 'small',
    onClick: () => {
      multiItemSlider.scrollBy({ left: -300, behavior: 'smooth' });
    },
  });
  leftButton.className += ' bg-wexham-white/70';
  const rightButton = Button({
    label: 'Next ›',
    variant: 'tertiary',
    size: 'small',
    onClick: () => {
      multiItemSlider.scrollBy({ left: 300, behavior: 'smooth' });
    },
  });
  rightButton.className += ' bg-wexham-white/70';
  scrollButtons.appendChild(leftButton);
  scrollButtons.appendChild(rightButton);
  multiItemSlider.appendChild(scrollButtons);

  return multiItemSlider;
}
