import type { Profile } from '../../api/profilesService';
import { Button } from './Buttons';

export function renderProfileCard(
  profile: Profile,
  onEditClick: (profileName: string) => void
): HTMLElement | null {
  if (!profile) {
    return null;
  }
  const profileCard = document.createElement('div');
  profileCard.className =
    'profile-card relative flex flex-col gap-6 items-center border-wexham-dark border-t-1 border-b-1 h-min w-full md:max-w-[70rem] bg-wexham-white';
  const banner = renderBanner(profile);
  if (banner) {
    profileCard.appendChild(banner);
  }
  const avatar = renderAvatar(profile);
  avatar?.classList.add(
    'absolute',
    'top-[45%]',
    'left-1/2',
    '-translate-x-1/2'
  );
  if (avatar) {
    profileCard.appendChild(avatar);
  }
  const contentSection = document.createElement('div');
  contentSection.className =
    'flex w-full justify-between md:justify-center md:gap-16 xl:gap-24 items-center px-3';
  const username = renderUsername(profile);
  contentSection.appendChild(username);
  const editButton = renderEditButton(profile, onEditClick);
  contentSection.appendChild(editButton);
  profileCard.appendChild(contentSection);
  const bio = renderBio(profile);
  if (bio) {
    profileCard.appendChild(bio);
  }

  return profileCard;
}

function renderBanner(profile: Profile): HTMLElement | null {
  if (!profile || !profile.banner.url) {
    return null;
  }
  const bannerImg = document.createElement('img');
  bannerImg.src = profile.banner.url;
  bannerImg.alt = profile.banner.alt || `${profile.name}'s banner`;
  bannerImg.className = 'w-full h-48 object-cover';
  return bannerImg;
}
function renderAvatar(profile: Profile): HTMLElement | null {
  if (!profile || !profile.avatar.url) {
    return null;
  }
  const avatarImg = document.createElement('img');
  avatarImg.src = profile.avatar.url;
  avatarImg.alt = profile.avatar.alt || `${profile.name}'s avatar`;
  avatarImg.className = 'w-20 h-20 rounded-full border-4 object-cover';
  return avatarImg;
}

function renderUsername(profile: Profile): HTMLElement {
  const username = document.createElement('h2');
  username.className = 'font-heading text-lg text-wexham-dark uppercase';
  username.textContent = profile.name;
  return username;
}

function renderEditButton(
  profile: Profile,
  onEditClick: (profileName: string) => void
): HTMLElement {
  const editButton = Button({
    label: 'Edit Profile',
    variant: 'primary',
    size: 'small',
    onClick: () => {
      onEditClick(profile.name);
    },
  });

  return editButton;
}

function renderBio(profile: Profile): HTMLElement | null {
  if (!profile.bio) {
    return null;
  }
  const bio = document.createElement('p');
  bio.className = 'font-body text-sm text-wexham-dark px-3 py-2';
  bio.textContent = profile.bio;
  return bio;
}
