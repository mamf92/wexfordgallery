import type { CreateListingFormData } from '../api/listingsService.ts';

/**
 * Return on validation errors
 */
interface ListingValidationError {
  field?: 'title' | 'description' | 'tags' | 'media';
  message: string;
}

/**
 * Validates the data for creating a new listing.
 */

export function validateCreateListingData(
  data: CreateListingFormData
): ListingValidationError | null {
  if (!data.title) {
    return {
      message:
        'Title is required. Please fill in the title field and try again.',
    };
  }
  const titleRegex = /^.{3,60}$/;
  const descriptionRegex = /^.{3,}$/;
  const tagRegex = /^[a-zA-ZÀ-ÿ0-9]{3,}$/;
  const imageUrlRegex = /^.*\.(gif|jpe?g|png|webp)($|\?.*$|#.*$|\/.*$)$/;
  const imageAltRegex = /^.{3,150}$/;

  if (!titleRegex.test(data.title)) {
    return {
      field: 'title',
      message: 'Title must be between 3 and 60 characters long.',
    };
  }

  if (data.description) {
    if (!descriptionRegex.test(data.description)) {
      return {
        field: 'description',
        message: 'Description must be at least 3 characters long.',
      };
    }
  }

  if (data.tags) {
    for (const tag of data.tags) {
      if (!tagRegex.test(tag)) {
        return {
          field: 'tags',
          message:
            'Each tag must be at least 3 characters long and contain only letters and numbers.',
        };
      }
    }
  }

  if (data.media) {
    for (const mediaItem of data.media) {
      if (!imageUrlRegex.test(mediaItem.url)) {
        return {
          field: 'media',
          message:
            'Each media URL must be a valid image URL ending with .gif, .jpg, .jpeg, .png, or .webp.',
        };
      }
      if (!imageAltRegex.test(mediaItem.alt)) {
        return {
          field: 'media',
          message: 'Alt text must be 150 characters or less.',
        };
      }
    }
  }

  return null;
}
