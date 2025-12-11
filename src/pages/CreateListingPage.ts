import {
  renderListingForm,
  type ListingFormData,
} from '../components/forms/ListingForm';
import {
  createListing,
  updateListing,
  type Listing,
} from '../api/listingsService';
import { showModal } from '../components/ui/Modals';

const BASE = import.meta.env.BASE_URL;
const CLOSING_DATE_REGEX = /^\d{2}\.\d{2}\.\d{2}$/;

export async function renderCreateListingPage(options?: {
  listing?: Listing;
}): Promise<HTMLElement> {
  const page = document.createElement('div');
  page.className = 'flex flex-col gap-6 w-full items-center py-8 px-4';

  const form = renderListingForm({
    isUpdate: !!options?.listing,
    listing: options?.listing,
    onSubmit: async (data) => handleListingSubmit(data, options?.listing?.id),
  });

  page.appendChild(form);
  return page;
}

async function handleListingSubmit(data: ListingFormData, listingId?: string) {
  try {
    const endsAt = parseDdMmYyToIso(data.closingDate);
    const payload = { ...data, endsAt };

    if (listingId) {
      await updateListing(listingId, payload);
      showModal({
        title: 'Listing updated',
        message: 'Your listing has been updated.',
        icon: 'success',
      });
      window.location.href = `${BASE}listing/${listingId}`;
    } else {
      const res = await createListing(payload);
      showModal({
        title: 'Listing created',
        message: 'Your listing has been published.',
        icon: 'success',
      });
      window.location.href = `${BASE}listing/${res.data.id}`;
    }
  } catch (error) {
    console.error('Error saving listing:', error);
    showModal({
      title: 'Error',
      message:
        error instanceof Error ? error.message : 'Could not save listing.',
      icon: 'error',
    });
  }
}

function parseDdMmYyToIso(input: string): string {
  if (!CLOSING_DATE_REGEX.test(input)) {
    throw new Error('Closing date must be in format dd.mm.yy');
  }
  const [dd, mm, yy] = input.split('.').map(Number);
  const fullYear = 2000 + yy; // assumes 20yy
  const date = new Date(fullYear, mm - 1, dd);
  if (isNaN(date.getTime())) {
    throw new Error('Closing date is invalid');
  }
  return date.toISOString();
}
