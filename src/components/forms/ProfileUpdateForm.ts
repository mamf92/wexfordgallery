import { TextInput } from '../inputs/InputField';
import { TextArea } from '../inputs/TextArea';
import { Button } from '../ui/Buttons';
import type { Profile } from '../../api/profilesService';

export interface ProfileFormData {
  bio: string;
  avatarUrl: string;
  avatarAlt: string;
  bannerUrl: string;
  bannerAlt: string;
}

interface ProfileUpdateFormProps {
  profile: Profile;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  isLoading?: boolean;
}

export function renderProfileEditForm({
  profile,
  onSubmit,
  isLoading = false,
}: ProfileUpdateFormProps): HTMLElement {
  const formContainer = document.createElement('div');
  formContainer.className =
    'flex flex-col w-[90vw] bg-wexham-white my-6 p-4 py-5 lg:px-8 lg:py-6 border-y-1 lg:border-y-2 border-wexham-dark lg:max-w-[42.5rem] gap-4';

  const formTitle = document.createElement('h1');
  formTitle.className = 'text-2xl lg:text-3xl font-semibold font-heading';
  formTitle.textContent = 'Edit Profile';
  formContainer.appendChild(formTitle);

  const formDescription = document.createElement('p');
  formDescription.textContent =
    'Make changes to your profile information below.';
  formDescription.className = 'text-lg font-body';
  formContainer.appendChild(formDescription);

  const form = document.createElement('form');
  form.className = 'flex flex-col gap-8 w-full items-center';

  const bioInput = TextArea({
    id: 'profile-bio',
    name: 'bio',
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    value: profile.bio || '',
    required: false,
    maxLength: 160,
  });
  bioInput.classList.add('w-full');
  form.appendChild(bioInput);

  const avatarUrlInput = TextInput({
    id: 'avatar-url',
    name: 'avatarUrl',
    label: 'Avatar URL',
    type: 'url',
    placeholder: 'https://example.com/avatar.jpg',
    value: profile.avatar?.url || '',
    required: false,
    pattern: 'https?://.*.(?:png|jpg|jpeg|gif|webp)',
  });
  avatarUrlInput.classList.add('w-full');
  form.appendChild(avatarUrlInput);

  const avatarAltInput = TextInput({
    id: 'avatar-alt',
    name: 'avatarAlt',
    label: 'Avatar Alt Text',
    type: 'text',
    placeholder: 'Description of your avatar',
    value: profile.avatar?.alt || '',
    required: false,
    maxLength: 150,
  });
  avatarAltInput.classList.add('w-full');
  form.appendChild(avatarAltInput);

  const bannerUrlInput = TextInput({
    id: 'banner-url',
    name: 'bannerUrl',
    label: 'Banner URL',
    type: 'url',
    placeholder: 'https://example.com/banner.jpg',
    value: profile.banner?.url || '',
    required: false,
    pattern: 'https?://.*.(?:png|jpg|jpeg|gif|webp)',
  });
  bannerUrlInput.classList.add('w-full');
  form.appendChild(bannerUrlInput);

  const bannerAltInput = TextInput({
    id: 'banner-alt',
    name: 'bannerAlt',
    label: 'Banner Alt Text',
    type: 'text',
    placeholder: 'Description of your banner',
    value: profile.banner?.alt || '',
    required: false,
    maxLength: 150,
  });
  bannerAltInput.classList.add('w-full');
  form.appendChild(bannerAltInput);

  const submitButton = Button({
    label: isLoading ? 'Saving...' : 'Save Changes',
    size: 'small',
    variant: 'primary',
    onClick: async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const data: ProfileFormData = {
        bio: formData.get('bio') as string,
        avatarUrl: formData.get('avatarUrl') as string,
        avatarAlt: formData.get('avatarAlt') as string,
        bannerUrl: formData.get('bannerUrl') as string,
        bannerAlt: formData.get('bannerAlt') as string,
      };
      submitButton.disabled = isLoading;
      await onSubmit(data);
    },
  });
  submitButton.classList.add('mt-4');
  form.appendChild(submitButton);

  formContainer.appendChild(form);
  return formContainer;
}
