import type { FullListing, Listing } from '../../api/listingsService';

const BASE = import.meta.env.BASE_URL;

/**
 * Renders a hero section for a single listing item with optional description.
 */
export function renderSingleItemHero(
  listing: FullListing | Listing,
  options?: {
    withDescription?: boolean;
  }
): HTMLElement | null {
  if (!listing) {
    console.error('No listing data provided to renderListingCard.');
    return null;
  }
  const singleItemContainer = document.createElement('div');
  singleItemContainer.className =
    'relative flex flex-col border-wexham-dark border-t-1 border-b-1 h-min w-full bg-wexham-white';
  const mediaSection = renderMediaSection(listing);
  if (!mediaSection) {
    return null;
  }
  singleItemContainer.appendChild(mediaSection);

  const singleItemContent = document.createElement('div');
  singleItemContent.className = 'flex flex-col align-start p-4';
  const title = renderSingleItemTitle(listing);
  singleItemContent.appendChild(title);
  if (options?.withDescription && listing.description) {
    const description = renderSingleItemDescription(listing);
    singleItemContent.appendChild(description);
  }
  singleItemContainer.appendChild(singleItemContent);
  return singleItemContainer;
}

/**
 * Creates a clickable media section with the listing's first image.
 */
function renderMediaSection(
  listing: FullListing | Listing
): HTMLElement | null {
  if (listing.media) {
    const mediaLink = document.createElement('a');
    mediaLink.className =
      'flex border-wexham-dark border-b-1 focus:border-[0.4rem] focus:border-wexham-blue hover:cursor-pointer h-[60vh]';
    mediaLink.href = BASE + `listing/${listing.id}`;
    mediaLink.tabIndex = 0;
    mediaLink.setAttribute('aria-label', `View post titled ${listing.title}`);

    const img = document.createElement('img');
    img.src = listing.media[0].url;
    img.alt = listing.media[0].alt || listing.title;
    img.className = 'w-full object-cover hover:cursor-pointer';
    mediaLink.appendChild(img);
    return mediaLink;
  } else {
    return null;
  }
}

/**
 * Creates a heading element with the listing title.
 */
function renderSingleItemTitle(listing: FullListing | Listing): HTMLElement {
  const title = document.createElement('h3');
  title.className =
    'w-full font-heading font-semibold text-wexham-dark text-md';
  title.textContent = listing.title;
  return title;
}

/**
 * Creates a paragraph element with the listing description.
 */
function renderSingleItemDescription(
  listing: FullListing | Listing
): HTMLElement {
  const body = document.createElement('p');
  body.className = 'font-body text-xs text-wexham-dark';
  body.textContent = listing.description;
  return body;
}
