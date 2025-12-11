import {
  renderListingForm,
  type ListingFormData,
} from '../components/forms/ListingForm';
import {
  createListing,
  updateListing,
  getListingById,
} from '../api/listingsService';
import { showModal } from '../components/ui/Modals';
import { showPageSpinner } from '../components/ui/Spinners';
import { ApiClientError } from '../api/apiClient';

const BASE = import.meta.env.BASE_URL;
const CLOSING_DATE_REGEX = /^\d{2}\.\d{2}\.\d{2}$/;
const CLOSING_TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

export async function renderCreateListingPage(
  params?: Record<string, string>
): Promise<HTMLElement> {
  const page = document.createElement('div');
  page.className = 'flex flex-col gap-6 w-full items-center py-8 px-4';

  const listingId = params?.id;

  if (listingId) {
    const spinner = showPageSpinner('medium');
    page.appendChild(spinner);

    try {
      const response = await getListingById(listingId);
      const listing = response.data;

      page.removeChild(spinner);
      const form = renderListingForm({
        isUpdate: true,
        listing,
        onSubmit: async (data) => handleListingSubmit(data, listingId),
      });
      page.appendChild(form);
    } catch (error) {
      page.removeChild(spinner);
      console.error('Error loading listing:', error);

      const errorMessage =
        error instanceof ApiClientError
          ? error.message
          : 'Could not load listing for editing.';

      showModal({
        title: 'Error',
        message: errorMessage,
        icon: 'error',
      });
      window.location.href = `${BASE}profile`;
    }
  } else {
    const form = renderListingForm({
      isUpdate: false,
      onSubmit: async (data) => handleListingSubmit(data),
    });
    page.appendChild(form);
  }

  return page;
}

async function handleListingSubmit(data: ListingFormData, listingId?: string) {
  try {
    const endsAt = parseDdMmYyHhMmToIso(data.closingDate, data.closingTime);
    const payload = { ...data, endsAt };

    if (listingId) {
      await updateListing(listingId, payload);
      showModal({
        title: 'Listing updated',
        message: 'Your listing has been updated.',
        icon: 'success',
      });
      setTimeout(() => {
        window.location.href = `${BASE}listing/${listingId}`;
      }, 2000);
    } else {
      const res = await createListing(payload);
      showModal({
        title: 'Listing created',
        message: 'Your listing has been published.',
        icon: 'success',
      });
      setTimeout(() => {
        window.location.href = `${BASE}listing/${res.data.id}`;
      }, 2000);
    }
  } catch (error) {
    console.error('Error saving listing:', error);

    let errorMessage = 'Could not save listing. Please try again.';

    if (error instanceof ApiClientError) {
      errorMessage = error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    showModal({
      title: 'Error',
      message: errorMessage,
      icon: 'error',
    });
  }
}

function parseDdMmYyHhMmToIso(dateInput: string, timeInput: string): string {
  if (!CLOSING_DATE_REGEX.test(dateInput)) {
    throw new Error('Closing date must be in format dd.mm.yy');
  }
  if (!CLOSING_TIME_REGEX.test(timeInput)) {
    throw new Error('Closing time must be in format hh:mm (24-hour)');
  }

  const [dd, mm, yy] = dateInput.split('.').map(Number);
  const [hh, min] = timeInput.split(':').map(Number);

  const fullYear = 2000 + yy;

  const date = new Date(fullYear, mm - 1, dd, hh, min);

  if (
    isNaN(date.getTime()) ||
    date.getFullYear() !== fullYear ||
    date.getMonth() !== mm - 1 ||
    date.getDate() !== dd
  ) {
    throw new Error('Invalid date. Please check day, month, and year.');
  }

  if (date <= new Date()) {
    throw new Error('Closing date and time must be in the future.');
  }

  return date.toISOString();
}
