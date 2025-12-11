import { getSingleProfile, updateProfile } from '../api/profilesService';
import { getUserName } from '../auth/authState';
import {
  renderProfileEditForm,
  type ProfileFormData,
} from '../components/forms/ProfileUpdateForm';
import { showModal } from '../components/ui/Modals';

const BASE = import.meta.env.BASE_URL;

/**
 * Renders the profile edit page with a form to update bio, avatar, and banner.
 * Redirects unauthenticated users with a warning modal.
 */
export async function renderEditProfilePage(): Promise<HTMLElement> {
  const page = document.createElement('div');
  page.className =
    'flex flex-col gap-6 w-full items-center px-4 py-8 bg-aurora-silk';

  const userName = getUserName();
  if (!userName) {
    showModal({
      title: 'Not signed in',
      message: 'Please log in to edit your profile.',
      icon: 'warning',
    });
    return page;
  }

  try {
    const { data: profile } = await getSingleProfile(userName);

    const formContainer = renderProfileEditForm({
      profile,
      onSubmit: (data) => handleEditProfileFormSubmit(userName, data),
    });
    page.appendChild(formContainer);
  } catch (error) {
    console.error('Error loading profile:', error);
    showModal({
      title: 'Error',
      message: 'Could not load your profile. Please try again.',
      icon: 'error',
    });
  }

  return page;
}

/**
 * Submits profile updates to the API and redirects to the profile page on success.
 */
async function handleEditProfileFormSubmit(
  userName: string,
  data: ProfileFormData
): Promise<void> {
  try {
    await updateProfile({
      name: userName,
      data: {
        bio: data.bio,
        avatar: {
          url: data.avatarUrl,
          alt: data.avatarAlt,
        },
        banner: {
          url: data.bannerUrl,
          alt: data.bannerAlt,
        },
      },
    });

    showModal({
      title: 'Profile Updated',
      message: 'Your profile has been updated successfully.',
      icon: 'success',
    });

    setTimeout(() => {
      window.location.href = `${BASE}profile`;
    }, 2000);
  } catch (error) {
    console.error('Error updating profile:', error);
    showModal({
      title: 'Error',
      message:
        error instanceof Error ? error.message : 'Could not update profile.',
      icon: 'error',
    });
  }
}
