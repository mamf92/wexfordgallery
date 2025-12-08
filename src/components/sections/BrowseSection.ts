import { renderSectionHeader } from './Hero';
import { renderThumbnail } from '../ui/Thumbnail';
import type { ThumbnailCard } from '../ui/Thumbnail';
import { renderSearchBar } from '../forms/SearchBar';
/**
 * Renders the Browse section showcasing the most recent listings.
 */
export function renderBrowseSection(
  onSubmit: () => void,
  listings?: ThumbnailCard[]
): HTMLElement {
  const browseSection = document.createElement('section');
  browseSection.className =
    'flex flex-col gap-4 w-full flex items-center justify-center';

  const sectionHeader = renderSectionHeader('Browse', 'Explore our selection');
  browseSection.appendChild(sectionHeader);

  const searchBar = renderSearchBar({
    onSubmit,
    onFilterButtonPress: () => console.log('Filter button pressed'),
    onSortButtonPress: () => console.log('Sort button pressed'),
    filterButton: true,
    sortButton: true,
  });
  browseSection.appendChild(searchBar);

  if (listings) {
    const searchResults = renderSearchResults(listings);
    browseSection.appendChild(searchResults);
  }
  return browseSection;
}

function renderSearchResults(listings: ThumbnailCard[]): HTMLElement {
  const searchResultsContainer = document.createElement('div');
  searchResultsContainer.className =
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full px-4';

  listings.forEach(({ listing, listOptions }) => {
    const thumbnail = renderThumbnail(listing, listOptions);
    if (thumbnail) {
      searchResultsContainer.appendChild(thumbnail);
    }
  });

  return searchResultsContainer;
}
