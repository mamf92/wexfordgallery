import { TextInput } from '../inputs/InputField';
import { TextArea } from '../inputs/TextArea';
import { Button } from '../ui/Buttons';
import type { Listing, Media } from '../../api/listingsService';

const CLOSING_DATE_PATTERN = '^\\d{2}\\.\\d{2}\\.\\d{2}$'; // dd.mm.yy

export interface ListingFormData {
  title: string;
  description: string;
  tags: string[];
  media: Media[];
  closingDate: string;
  closingTime: string;
}

interface ListingProps {
  isUpdate: boolean;
  onSubmit: (data: ListingFormData) => Promise<void>;
  listing?: Listing;
}

/**
 * Validates if a date string in dd.mm.yy format is a real date
 */
function isValidDate(dateStr: string): boolean {
  if (!/^\d{2}\.\d{2}\.\d{2}$/.test(dateStr)) return false;

  const [dd, mm, yy] = dateStr.split('.').map(Number);
  const fullYear = 2000 + yy;

  const date = new Date(fullYear, mm - 1, dd);
  return (
    date.getFullYear() === fullYear &&
    date.getMonth() === mm - 1 &&
    date.getDate() === dd
  );
}

/**
 * Validates if a time string in hh:mm format is valid
 */
function isValidTime(timeStr: string): boolean {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(timeStr)) return false;

  const [hh, mm] = timeStr.split(':').map(Number);
  return hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59;
}

/**
 * Validates if date and time combination is in the future
 */
function isDateTimeInFuture(
  dateStr: string,
  timeStr: string
): { valid: boolean; message?: string } {
  if (!isValidDate(dateStr)) {
    return {
      valid: false,
      message: 'Invalid date. Please check day, month, and year.',
    };
  }

  if (!isValidTime(timeStr)) {
    return {
      valid: false,
      message: 'Invalid time. Use 24-hour format (00:00 to 23:59).',
    };
  }

  const [dd, mm, yy] = dateStr.split('.').map(Number);
  const [hh, min] = timeStr.split(':').map(Number);
  const fullYear = 2000 + yy;
  const date = new Date(fullYear, mm - 1, dd, hh, min);

  const now = new Date();
  if (date <= now) {
    return {
      valid: false,
      message: 'Closing date and time must be in the future.',
    };
  }

  return { valid: true };
}

/**
 * Renders the listing form.
 * @param listingData - Form configuration and existing listing data
 * @returns The form container element
 */
export function renderListingForm({
  isUpdate,
  onSubmit,
  listing,
}: ListingProps): HTMLElement {
  const formContainer = document.createElement('div');
  formContainer.className =
    'flex flex-col w-[90vw] bg-wexham-white px-8 py-6 border-wexham-dark border-y-1 lg:border-y-2 lg:max-w-[42.5rem] gap-4';

  // Form title and description
  const formTitle = document.createElement('h1');
  formTitle.className = 'text-2xl lg:text-3xl font-semibold font-heading';
  formTitle.textContent = isUpdate
    ? 'Edit your listing'
    : 'Create a new listing';
  formContainer.appendChild(formTitle);

  const formDescription = document.createElement('p');
  formDescription.className = 'text-lg font-body';
  formDescription.textContent = isUpdate
    ? 'Edit your listing and ensure all required fields are provided. When done, click Publish.'
    : 'Fill in the required fields and any extra fields. When done, click Publish.';
  formContainer.appendChild(formDescription);

  const form = document.createElement('form');
  form.id = 'listing-form';
  form.className = 'flex flex-col gap-6 w-full';
  form.noValidate = true; // Use custom validation

  const titleInput = TextInput({
    id: 'listing-title',
    name: 'title',
    label: 'Listing Title *',
    type: 'text',
    placeholder: 'Title. Max 60 characters',
    value: listing?.title || '',
    required: true,
    minLength: 3,
    maxLength: 60,
    pattern: '^.{3,60}$',
    title: 'Title must be between 3 and 60 characters',
  });
  titleInput.classList.add('w-full');
  form.appendChild(titleInput);

  const descriptionInput = TextArea({
    id: 'listing-description',
    name: 'description',
    label: 'Listing Description *',
    placeholder: 'Add a listing description.',
    value: listing?.description || '',
    required: true,
    minLength: 3,
    maxLength: 280,
    title: 'Description must be between 3 and 280 characters',
  });
  descriptionInput.classList.add('w-full');
  form.appendChild(descriptionInput);

  const closingDateInput = TextInput({
    id: 'listing-closing-date',
    name: 'closingDate',
    label: 'Closing Date (dd.mm.yy) *',
    type: 'text',
    placeholder: 'e.g. 24.12.25',
    value: listing?.endsAt ? formatDateToDdMmYy(listing.endsAt) : '',
    required: true,
    pattern: CLOSING_DATE_PATTERN,
    title: 'Use format dd.mm.yy, e.g. 24.12.25',
  });
  closingDateInput.classList.add('w-full');
  form.appendChild(closingDateInput);

  // Add time input
  const closingTimeInput = TextInput({
    id: 'listing-closing-time',
    name: 'closingTime',
    label: 'Closing Time (hh:mm) *',
    type: 'text',
    placeholder: 'e.g. 18:37',
    value: listing?.endsAt ? formatTimeToHhMm(listing.endsAt) : '',
    required: true,
    pattern: '^([01]\\d|2[0-3]):[0-5]\\d$',
    title: 'Use 24-hour format hh:mm, e.g. 18:37',
  });
  closingTimeInput.classList.add('w-full');
  form.appendChild(closingTimeInput);

  // Error message container for date/time validation
  const dateTimeError = document.createElement('div');
  dateTimeError.className = 'text-red-600 text-sm font-body hidden';
  dateTimeError.setAttribute('role', 'alert');
  form.appendChild(dateTimeError);

  // Add real-time validation for date/time combination
  const validateDateTime = () => {
    const dateInput = form.querySelector<HTMLInputElement>(
      '#listing-closing-date'
    );
    const timeInput = form.querySelector<HTMLInputElement>(
      '#listing-closing-time'
    );

    if (!dateInput?.value || !timeInput?.value) {
      dateTimeError.textContent = '';
      dateTimeError.classList.add('hidden');
      return;
    }

    const validation = isDateTimeInFuture(dateInput.value, timeInput.value);
    if (!validation.valid) {
      dateTimeError.textContent = validation.message || '';
      dateTimeError.classList.remove('hidden');
    } else {
      dateTimeError.textContent = '';
      dateTimeError.classList.add('hidden');
    }
  };

  closingDateInput.addEventListener('blur', validateDateTime);
  closingTimeInput.addEventListener('blur', validateDateTime);

  const tagsInput = TextInput({
    id: 'listing-tags',
    name: 'tags',
    label: 'Tags (Optional)',
    type: 'text',
    placeholder: 'Enter tags separated by commas. No special characters.',
    value: listing?.tags?.join(', ') || '',
    required: false,
    pattern: '^([a-zA-Z0-9]{3,}(?:[,\\s]+[a-zA-Z0-9]{3,})*)*$',
    title:
      'Minimum tag length is 3 characters. Tags must be separated by commas or spaces.',
  });
  tagsInput.classList.add('w-full');
  form.appendChild(tagsInput);

  const mediaSection = renderMediaInput(listing?.media);
  form.appendChild(mediaSection);

  const submitButton = Button({
    label: 'Publish',
    size: 'medium',
    variant: 'primary',
    onClick: async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const dateStr = formData.get('closingDate') as string;
      const timeStr = formData.get('closingTime') as string;

      const validation = isDateTimeInFuture(dateStr, timeStr);
      if (!validation.valid) {
        dateTimeError.textContent = validation.message || '';
        dateTimeError.classList.remove('hidden');
        dateTimeError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const data: ListingFormData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        tags: (formData.get('tags') as string)
          .split(/[,\s]+/)
          .filter((t) => t.length > 0),
        media: [],
        closingDate: dateStr,
        closingTime: timeStr,
      };
      await onSubmit(data);
    },
  });
  submitButton.classList.add('mt-4');
  form.appendChild(submitButton);

  formContainer.appendChild(form);
  return formContainer;
}

function renderMediaInput(media?: Media[]): HTMLElement {
  const mediaContainer = document.createElement('div');
  mediaContainer.className = 'flex flex-col gap-4 w-full';

  const mediaLabel = document.createElement('label');
  mediaLabel.className = 'font-heading text-md font-semibold text-wexham-dark';
  mediaLabel.textContent = 'Images (Optional)';
  mediaContainer.appendChild(mediaLabel);

  if (!media || media.length === 0) {
    const singleMedia = document.createElement('div');
    singleMedia.className =
      'flex flex-col gap-2 border-l-2 border-wexham-light pl-4';

    const urlInput = TextInput({
      id: 'media-url-0',
      name: 'media-url',
      label: 'Image URL',
      type: 'url',
      placeholder: 'https://example.com/image.jpg',
      required: false,
      pattern: 'https?://.*.(?:png|jpg|jpeg|gif|webp)',
      title: 'Must be a valid image URL',
    });
    urlInput.classList.add('w-full');
    singleMedia.appendChild(urlInput);

    const altInput = TextInput({
      id: 'media-alt-0',
      name: 'media-alt',
      label: 'Image Alt Text',
      type: 'text',
      placeholder: 'Description of the image',
      required: false,
      maxLength: 150,
    });
    altInput.classList.add('w-full');
    singleMedia.appendChild(altInput);

    mediaContainer.appendChild(singleMedia);
  } else {
    media.forEach((mediaItem, index) => {
      const singleMedia = document.createElement('div');
      singleMedia.className =
        'flex flex-col gap-2 border-l-2 border-wexham-light pl-4';

      const urlInput = TextInput({
        id: `media-url-${index}`,
        name: 'media-url',
        label: `Image URL ${index + 1}`,
        type: 'url',
        placeholder: 'https://example.com/image.jpg',
        value: mediaItem.url || '',
        required: false,
        pattern: 'https?://.*.(?:png|jpg|jpeg|gif|webp)',
        title: 'Must be a valid image URL',
      });
      urlInput.classList.add('w-full');
      singleMedia.appendChild(urlInput);

      const altInput = TextInput({
        id: `media-alt-${index}`,
        name: 'media-alt',
        label: `Image Alt Text ${index + 1}`,
        type: 'text',
        placeholder: 'Description of the image',
        value: mediaItem.alt || '',
        required: false,
        maxLength: 150,
      });
      altInput.classList.add('w-full');
      singleMedia.appendChild(altInput);

      mediaContainer.appendChild(singleMedia);
    });
  }

  return mediaContainer;
}

function formatDateToDdMmYy(isoDate: string): string {
  const d = new Date(isoDate);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear() % 100).padStart(2, '0');
  return `${dd}.${mm}.${yy}`;
}

function formatTimeToHhMm(isoDate: string): string {
  const d = new Date(isoDate);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}
