import { renderSectionHeader } from './Hero';
import { renderListingCard } from '../ui/ListingCard';
import type { ListingCard } from '../ui/ListingCard';
/**
 * Renders the Latest section showcasing the most recent listings.
 */

export function renderLatestSection(listings: ListingCard[]): HTMLElement {
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
