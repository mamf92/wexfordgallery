import type { Listing } from '../../api/listingsService';
import { Button } from './Buttons';
const BASE = import.meta.env.BASE_URL;

/**
 * Creates the edit post form by displaying the post as values in the form.
 * @param post - The post in which the user wants to edit
 * @returns - The HTML string for the edit post form.
 */

export function renderListingCardWithEditActions(
  listing: Listing,
  options?: {
    onEdit?: (listingId: string) => void;
    onView?: (listingId: string) => void;
    onDelete?: (listingId: string) => Promise<void>;
  }
): HTMLElement | null {
  if (!listing) {
    return null;
  }
  const listingCard = document.createElement('article');
  listingCard.className =
    'listing-card relative flex flex-col border-wexham-dark border-t-1 border-b-1 h-min w-full bg-wexham-white';
  const mediaSection = renderMediaSection(listing);
  if (mediaSection) {
    listingCard.appendChild(mediaSection);
  }
  const contentSection = renderContentSection(listing);
  listingCard.appendChild(contentSection);

  const editActions = renderEditActions(listing, listingCard, {
    onEdit: options?.onEdit,
    onView: options?.onView,
    onDelete: options?.onDelete,
  });
  listingCard.appendChild(editActions);

  return listingCard;
}

// Sections
function renderMediaSection(listing: Listing): HTMLElement | null {
  if (!listing.media || listing.media.length === 0) {
    return null;
  }
  const mediaLink = document.createElement('a');
  mediaLink.className =
    'flex border-wexham-dark border-b-1 focus:border-[0.4rem] focus:border-wexham-blue hover:cursor-pointer h-80';
  mediaLink.href = BASE + `listing/${listing.id}`;
  mediaLink.tabIndex = 0;
  mediaLink.setAttribute('aria-label', `View post titled ${listing.title}`);

  const img = document.createElement('img');
  img.src = listing.media[0].url;
  img.alt = listing.media[0].alt || listing.title;
  img.className = 'object-cover hover:cursor-pointer';
  mediaLink.appendChild(img);
  return mediaLink;
}

function renderContentSection(listing: Listing): HTMLElement {
  const contentSection = document.createElement('div');
  contentSection.className =
    'flex flex-col w-full gap-1 px-2 py-1 justify-center';
  const title = renderListingTitle(listing);
  contentSection.appendChild(title);
  const description = renderDescription(listing);
  contentSection.appendChild(description);
  return contentSection;
}

function renderListingTitle(listing: Listing): HTMLElement {
  const title = document.createElement('h3');
  title.className = 'font-heading font-semibold text-md';
  title.textContent = listing.title;
  return title;
}

function renderDescription(listing: Listing): HTMLElement {
  const body = document.createElement('p');
  body.className = 'font-body text-xs';
  body.textContent = listing.description;
  return body;
}

function renderEditActions(
  listing: Listing,
  postCard: HTMLElement,
  options?: {
    onEdit?: (listingId: string) => void;
    onView?: (listingId: string) => void;
    onDelete?: (listingId: string) => Promise<void>;
  }
) {
  const actionsContainer = document.createElement('div');
  actionsContainer.className =
    'flex w-full border-t-1 border-b-1 border-wexham-dark py-1';
  const actions = document.createElement('div');
  actions.className = 'flex flex-row w-full justify-center gap-8';

  const deleteButton = Button({
    label: 'Delete',
    size: 'xsmall',
    variant: 'secondary',
    onClick: async () => {
      if (options?.onDelete) {
        await options.onDelete(listing.id);
      }
    },
  });
  actions.appendChild(deleteButton);

  const editButton = Button({
    label: 'Edit',
    size: 'xsmall',
    variant: 'primary',
    onClick: () => {
      if (options?.onEdit) {
        options.onEdit(listing.id);
      }
    },
  });

  actions.appendChild(editButton);

  const viewButton = Button({
    label: 'View',
    size: 'xsmall',
    variant: 'primary',
    onClick: () => {
      if (options?.onView) {
        options.onView(listing.id);
      }
    },
  });
  actions.appendChild(viewButton);

  actionsContainer.appendChild(actions);
  return actionsContainer;
}
