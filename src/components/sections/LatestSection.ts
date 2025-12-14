import { renderSectionHeader } from './Hero';
import { renderListingCard } from '../ui/ListingCard';
import type { ListingCard } from '../ui/ListingCard';
import { Button } from '../ui/Buttons';

/**
 * Renders a section displaying the most recent listings with an optional load more button.
 * @param listings - Array of listing cards to display
 * @param onLoadMore - Callback invoked when the load more button is clicked
 * @param showLoadMore - Controls load more button visibility
 * @throws When listings array is empty or null
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

/**
 * Creates a responsive grid container with listing cards.
 */
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
