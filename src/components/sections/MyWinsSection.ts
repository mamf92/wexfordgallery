import { renderSectionHeader } from './Hero';
import { renderThumbnail } from '../ui/Thumbnail';
import type { Listing } from '../../api/listingsService';
import { getWinsByProfile } from '../../api/profilesService';
import { getUserName } from '../../auth/authState';
import { showModal } from '../ui/Modals';

const BASE = import.meta.env.BASE_URL;

/**
 * Displays a grid of auctions the current user has won.
 * Shows an empty state if the user has no wins or is not authenticated.
 */
export async function renderMyWinsSection(): Promise<HTMLElement> {
  const wins = await getWins();

  const section = document.createElement('section');
  section.className =
    'flex flex-col my-4 gap-4 w-full flex items-center justify-center';

  const header = renderSectionHeader(
    'Your Wins',
    'Browse the auctions you have won.'
  );
  section.appendChild(header);

  if (!wins || wins.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'font-body text-md text-wexham-white px-4';
    empty.textContent = 'You have not won any listings yet.';
    section.appendChild(empty);
    return section;
  }

  const grid = document.createElement('div');
  grid.className =
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full px-4';

  wins.forEach((listing) => {
    const thumb = renderThumbnail(listing, { withDescription: false });
    if (thumb) {
      const link = document.createElement('a');
      link.href = `${BASE}listing/${listing.id}`;
      link.className =
        'block focus:outline-none focus:ring-2 focus:ring-wexham-blue';
      link.appendChild(thumb);
      grid.appendChild(link);
    }
  });

  section.appendChild(grid);
  return section;
}

/**
 * Fetches winning listings for the authenticated user.
 * Shows a warning modal if the user is not signed in.
 */
async function getWins(): Promise<Listing[]> {
  const userName = getUserName();
  if (!userName) {
    showModal({
      title: 'Not signed in',
      message: 'Please log in to view your wins.',
      icon: 'warning',
    });
    return [];
  }

  const { data = [] } = await getWinsByProfile({
    name: userName,
    page: 1,
    limit: 20,
  });
  return data;
}
