import { renderBrowseSection } from '../components/sections/BrowseSection';
import { getListingsBySearchQuery } from '../api/listingsService';
import type { Listing } from '../api/listingsService';
import type { ThumbnailCard } from '../components/ui/Thumbnail';
import { showModal } from '../components/ui/Modals';

/**
 * Renders the Browse page with search functionality.
 */
export function renderBrowsePage(): HTMLElement {
  const browsePageContainer = document.createElement('section');
  browsePageContainer.className =
    'flex flex-col items-center justify-center w-full gap-4 bg-aurora-silk py-8';

  let currentListings: ThumbnailCard[] = [];

  const handleSearchSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const searchQuery = formData.get('search') as string;

    if (!searchQuery || !searchQuery.trim()) {
      showModal({
        title: 'Search Required',
        message: 'Please enter a search term',
        icon: 'warning',
      });
      return;
    }

    try {
      // Normalize spaces to single spaces (not %20)
      const normalizedQuery = searchQuery.trim().replace(/\s+/g, ' ');

      const response = await getListingsBySearchQuery(normalizedQuery, {
        page: 1,
        limit: 20,
      });

      currentListings = mapListingsToThumbnails(response.data);

      // Re-render the browse section with new results
      browsePageContainer.innerHTML = '';
      const browseSection = renderBrowseSection(
        handleSearchSubmit,
        currentListings
      );
      browsePageContainer.appendChild(browseSection);

      if (currentListings.length === 0) {
        showModal({
          title: 'No Results',
          message: 'No listings found for your search',
          icon: 'warning',
        });
      }
    } catch (error) {
      console.error('Error searching listings:', error);
      showModal({
        title: 'Search Failed',
        message: 'Failed to search listings. Please try again.',
        icon: 'error',
      });
    }
  };

  const browseSection = renderBrowseSection(
    handleSearchSubmit,
    currentListings
  );
  browsePageContainer.appendChild(browseSection);

  return browsePageContainer;
}

/**
 * Maps API listings to thumbnail card format.
 */
function mapListingsToThumbnails(listings: Listing[]): ThumbnailCard[] {
  return listings.map((listing) => ({
    listing,
    listOptions: {
      withDescription: false,
    },
  }));
}
