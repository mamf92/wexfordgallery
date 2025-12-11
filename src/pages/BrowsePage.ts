import { renderBrowseSection } from '../components/sections/BrowseSection';
import { getListingsBySearchQuery } from '../api/listingsService';
import type { Listing, PaginationMeta } from '../api/listingsService';
import type { ThumbnailCard } from '../components/ui/Thumbnail';
import { showModal } from '../components/ui/Modals';
import { Button } from '../components/ui/Buttons';
import { showInlineSpinner } from '../components/ui/Spinners';

/**
 * Browse page with search functionality and pagination.
 * Allows users to search listings and load more results progressively.
 */
export function renderBrowsePage(): HTMLElement {
  const browsePageContainer = document.createElement('section');
  browsePageContainer.className =
    'flex flex-col items-center justify-center w-full gap-4 bg-aurora-silk py-8';

  let currentListings: ThumbnailCard[] = [];
  let currentQuery = '';
  let currentPage = 1;
  let paginationMeta: PaginationMeta | null = null;

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
      const normalizedQuery = searchQuery.trim().replace(/\s+/g, ' ');
      currentQuery = normalizedQuery;
      currentPage = 1;

      const response = await getListingsBySearchQuery(normalizedQuery, {
        page: 1,
        limit: 20,
      });

      currentListings = mapListingsToThumbnails(response.data);
      paginationMeta = response.meta;

      renderResults();

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

  const handleLoadMore = async () => {
    if (!currentQuery || !paginationMeta || paginationMeta.isLastPage) {
      return;
    }

    const loadMoreButton = document.getElementById('load-more-button');
    if (loadMoreButton) {
      const spinner = showInlineSpinner('medium');
      loadMoreButton.replaceWith(spinner);
    }

    try {
      currentPage += 1;

      const response = await getListingsBySearchQuery(currentQuery, {
        page: currentPage,
        limit: 20,
      });

      const newListings = mapListingsToThumbnails(response.data);
      currentListings = [...currentListings, ...newListings];
      paginationMeta = response.meta;

      renderResults();
    } catch (error) {
      console.error('Error loading more listings:', error);
      showModal({
        title: 'Load Failed',
        message: 'Failed to load more listings. Please try again.',
        icon: 'error',
      });
      renderResults();
    }
  };

  const renderResults = () => {
    browsePageContainer.innerHTML = '';
    const browseSection = renderBrowseSection(
      handleSearchSubmit,
      currentListings
    );
    browsePageContainer.appendChild(browseSection);

    if (
      paginationMeta &&
      !paginationMeta.isLastPage &&
      currentListings.length > 0
    ) {
      const loadMoreContainer = document.createElement('div');
      loadMoreContainer.className = 'flex justify-center w-full py-4';

      const loadMoreButton = Button({
        label: 'Load More',
        variant: 'primary',
        size: 'large',
        id: 'load-more-button',
        onClick: handleLoadMore,
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
      browsePageContainer.appendChild(loadMoreContainer);
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
 * Transforms API listing data into thumbnail card format for display.
 */
function mapListingsToThumbnails(listings: Listing[]): ThumbnailCard[] {
  return listings.map((listing) => ({
    listing,
    listOptions: {
      withDescription: false,
    },
  }));
}
