import { getSingleProfile } from '../api/profilesService';
import { getUserName } from '../auth/authState';
import { renderProfileCard } from '../components/ui/ProfileCard';
import { renderMyListingsSection } from '../components/sections/MyListingsSection';
import { renderMyWinsSection } from '../components/sections/MyWinsSection';
import { showModal } from '../components/ui/Modals';

const BASE = import.meta.env.BASE_URL;

export async function renderProfilePage(): Promise<HTMLElement> {
  const page = document.createElement('div');
  page.className =
    'flex flex-col gap-6 w-full items-center py-8 px-4 bg-aurora-silk';

  const userName = getUserName();
  if (!userName) {
    showModal({
      title: 'Not signed in',
      message: 'Please log in to view your profile.',
      icon: 'warning',
    });
    return page;
  }

  try {
    const { data: profile } = await getSingleProfile(userName);

    const profileCard = renderProfileCard(profile, () => {
      window.location.href = `${BASE}edit-profile`;
    });
    if (profileCard) {
      page.appendChild(profileCard);
    }

    const listingsSection = await renderMyListingsSection();
    page.appendChild(listingsSection);

    const winsSection = await renderMyWinsSection();
    page.appendChild(winsSection);
  } catch (error) {
    console.error('Error rendering profile page:', error);
    showModal({
      title: 'Error',
      message: 'Could not load your profile right now. Please try again.',
      icon: 'error',
    });
  }

  return page;
}
