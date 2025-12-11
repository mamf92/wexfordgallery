import { renderSectionHeader } from './Hero';
import { renderListingCardWithEditActions } from '../ui/ThumbnailWithEditActions';
import { Button } from '../ui/Buttons';
import type { Listing } from '../../api/listingsService';
import { deleteListing } from '../../api/listingsService';
import { getSimpleListingsByProfile } from '../../api/profilesService';
import { getUserName } from '../../auth/authState';
import { showModal } from '../ui/Modals';

const BASE = import.meta.env.BASE_URL;

/**
 * Renders the users current listings.
 */
export async function renderMyListingsSection(
  listingsWithOptions?: {
    listing: Listing;
    listOptions?: {
      onEdit?: (listingId: string) => void;
      onView?: (listingId: string) => void;
      onDelete?: (listingId: string) => Promise<void>;
    };
  }[]
): Promise<HTMLElement> {
  const listings =
    listingsWithOptions && listingsWithOptions.length >= 0
      ? listingsWithOptions
      : await getListingsByProfile();

  const myListingsSection = document.createElement('section');
  myListingsSection.className =
    'flex flex-col my-4 gap-4 w-full flex items-center justify-center';
  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'flex items-center justify-between w-full px-4';
  const sectionHeading = renderSectionHeader(
    'Your Listings',
    'View your current listings and manage them easily.'
  );
  sectionHeader.appendChild(sectionHeading);
  const createListingButton = Button({
    label: 'Create New Listing',
    size: 'large',
    variant: 'primary',
    onClick: () => {
      window.location.href = `${BASE}create-listing`;
    },
  });
  createListingButton.classList.add(
    'max-h-min',
    'whitespace-nowrap',
    'text-wexham-white',
    'border-wexham-white',
    'hover:bg-wexham-light',
    'hover:text-wexham-light'
  );
  sectionHeader.appendChild(createListingButton);
  myListingsSection.appendChild(sectionHeader);

  if (!listings || listings.length === 0) {
    myListingsSection.appendChild(renderEmptyState());
    return myListingsSection;
  }

  const myListingsItemCards = renderMyListingsItemCards(listings);
  myListingsSection.appendChild(myListingsItemCards);

  return myListingsSection;
}

function renderEmptyState(): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className =
    'flex flex-col items-center gap-3 w-full px-4 py-6 text-center border-wexham-dark border-t-1 border-b-1 bg-wexham-white';

  const message = document.createElement('p');
  message.className = 'font-body text-sm text-wexham-dark';
  message.textContent = 'You have no listings yet.';
  wrapper.appendChild(message);

  const cta = Button({
    label: 'Create a listing',
    size: 'small',
    variant: 'primary',
    onClick: () => {
      window.location.href = `${BASE}create-listing`;
    },
  });
  wrapper.appendChild(cta);

  return wrapper;
}

function renderMyListingsItemCards(
  listings: {
    listing: Listing;
    listOptions?: {
      onEdit?: (listingId: string) => void;
      onView?: (listingId: string) => void;
      onDelete?: (listingId: string) => Promise<void>;
    };
  }[]
): HTMLElement {
  const myListingsItemsContainer = document.createElement('div');
  myListingsItemsContainer.className =
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full px-4';

  listings.forEach(({ listing, listOptions }) => {
    const listingCardWithEditActions = renderListingCardWithEditActions(
      listing,
      listOptions
    );
    if (listingCardWithEditActions) {
      myListingsItemsContainer.appendChild(listingCardWithEditActions);
    }
  });

  return myListingsItemsContainer;
}

async function getListingsByProfile(): Promise<
  {
    listing: Listing;
    listOptions: {
      onEdit: (listingId: string) => void;
      onView: (listingId: string) => void;
      onDelete: (listingId: string) => Promise<void>;
    };
  }[]
> {
  const { data = [] } = await getSimpleListingsByProfile({
    name: getUserName(),
    page: 1,
    limit: 20,
  });

  return data.map((listing) => ({
    listing,
    listOptions: {
      onEdit: onEditListing,
      onView: onViewListing,
      onDelete: onDeleteListing,
    },
  }));
}

function onEditListing(listingId: string) {
  window.location.href = `${BASE}edit-listing/${listingId}`;
}

function onViewListing(listingId: string) {
  window.location.href = `${BASE}listing/${listingId}`;
}

async function onDeleteListing(listingId: string) {
  try {
    await deleteListing(listingId);
    showModal({
      title: 'Listing Deleted',
      message: 'Listing deleted successfully.',
      icon: 'success',
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error('Error deleting listing:', error);
  }
}
