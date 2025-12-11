import { renderMediaSection } from './ListingCard';
import type { FullListing, Listing } from '../../api/listingsService';

export interface ThumbnailCard {
  listing: FullListing | Listing;
  listOptions?: {
    withDescription?: boolean;
  };
}

/**
 * Creates a thumbnail card displaying listing media and title.
 * Returns null if listing data is missing or media cannot be rendered.
 */
export function renderThumbnail(
  listing: FullListing | Listing,
  options?: {
    withDescription?: boolean;
  }
): HTMLElement | null {
  if (!listing) {
    console.error('No listing data provided to renderThumbnail.');
    return null;
  }

  const thumbnailContainer = document.createElement('div');
  thumbnailContainer.className =
    'relative flex flex-col border-wexham-dark border-t-1 border-b-1 h-min w-full bg-wexham-white';

  const mediaSection = renderMediaSection(listing as FullListing);
  if (!mediaSection) {
    return null;
  }
  thumbnailContainer.appendChild(mediaSection);

  const title = renderThumbnailTitle(listing);
  title.className += ' text-md p-2';
  thumbnailContainer.appendChild(title);

  if (options?.withDescription && listing.description) {
    const description = renderDescription(listing);
    description.className += ' px-2 pb-2';
    thumbnailContainer.appendChild(description);
  }

  return thumbnailContainer;
}

/**
 * Creates an h3 element with the listing title.
 */
function renderThumbnailTitle(listing: FullListing | Listing): HTMLElement {
  const title = document.createElement('h3');
  title.className = 'font-heading font-semibold text-md p-2';
  title.textContent = listing.title;
  return title;
}

/**
 * Creates a paragraph element with the listing description text.
 */
function renderDescription(listing: Listing): HTMLElement {
  const body = document.createElement('p');
  body.className = 'font-body text-xs';
  body.textContent = listing.description;
  return body;
}
