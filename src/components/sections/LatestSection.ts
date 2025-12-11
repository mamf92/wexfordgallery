import { renderSectionHeader } from './Hero';
import { renderListingCard } from '../ui/ListingCard';
import type { ListingCard } from '../ui/ListingCard';
import { Button } from '../ui/Buttons';

/**
 * Renders the Latest section showcasing the most recent listings.
 */
export function renderLatestSection(
  listings: ListingCard[] | null,
  onLoadMore?: () => void,
  showLoadMore?: boolean
): HTMLElement {
  if (!listings || listings.length === 0) {
    throw new Error('No listings available for the Latest section.');
  }
  const latestSection = document.createElement('section');
  latestSection.className =
    'flex flex-col my-4 gap-4 w-full flex items-center justify-center';
  const sectionHeader = renderSectionHeader(
    'Latest',
    'View our latest additions'
  );
  latestSection.appendChild(sectionHeader);

  const latestItemCards = renderLatestItemCards(listings);
  latestSection.appendChild(latestItemCards);

  // Add load more button if callback is provided and showLoadMore is true
  if (onLoadMore && showLoadMore) {
    const loadMoreContainer = document.createElement('div');
    loadMoreContainer.className = 'flex justify-center w-full py-4';

    const loadMoreButton = Button({
      label: 'Load More',
      variant: 'primary',
      size: 'large',
      id: 'load-more-latest-button',
      onClick: onLoadMore,
    });

    // Override button styles for dark background
    loadMoreButton.className = loadMoreButton.className
      .replace(
        'border-wexham-dark text-wexham-dark',
        'border-wexham-white text-wexham-white'
      )
      .replace(
        'hover:border-wexham-blue hover:text-wexham-blue',
        'hover:border-wexham-white/80 hover:text-wexham-white/80'
      );

    loadMoreContainer.appendChild(loadMoreButton);
    latestSection.appendChild(loadMoreContainer);
  }

  return latestSection;
}

function renderLatestItemCards(listings: ListingCard[]): HTMLElement {
  const latestItemsContainer = document.createElement('div');
  latestItemsContainer.className =
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full px-4';

  listings.forEach(({ listing, listOptions }) => {
    const listingCard = renderListingCard(listing, listOptions);
    if (listingCard) {
      latestItemsContainer.appendChild(listingCard);
    }
  });

  return latestItemsContainer;
}
